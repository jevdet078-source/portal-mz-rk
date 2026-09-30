/**
 * Запись прохода по сценарию прототипа в видео с субтитрами.
 *
 *   node tools/serve.mjs            — в соседнем окне, прототипы должны быть подняты
 *   npm run record -- auth          → exports/video/<fileName>.mp4
 *   npm run record -- auth --port=5174
 *
 * Зачем. Запись отправляют аналитикам и разработчикам вместо созвона: по ней
 * видно поведение экранов, ветки сценария и тексты ошибок. После правок
 * прототипа запись переснимается одной командой.
 *
 * Движок перенесён из egmis-patient (tools/record.mjs) и доработан под портал:
 * страницы портала — отдельные .dc.html, поэтому слой записи (курсор, субтитр,
 * заставка) ставится заново на каждой загрузке страницы, а текущий субтитр и
 * положение курсора переживают переход через sessionStorage.
 *
 * Сценарии лежат в tools/record/<имя>.mjs и пишутся почти словами:
 * «нажми сюда, подпиши так, подожди столько».
 * Видео в git не идут (exports/video в .gitignore).
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { launch } from 'puppeteer-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'exports', 'video');

/* ── Аргументы ────────────────────────────────────────────────────── */

const args = process.argv.slice(2);
const flags = new Map(args.filter((a) => a.startsWith('--')).map((a) => a.replace(/^--/, '').split('=')));
const scenarioName = args.find((a) => !a.startsWith('--'));
const port = Number(flags.get('port') ?? 5173);
const keepFrames = flags.has('keep-frames');

const scenarios = readdirSync(join(root, 'tools', 'record'))
  .filter((f) => f.endsWith('.mjs'))
  .map((f) => f.replace(/\.mjs$/, ''));

if (!scenarioName || !scenarios.includes(scenarioName)) {
  console.error(
    (scenarioName ? `Нет сценария «${scenarioName}».` : 'Не указан сценарий.') +
      `\nДоступные: ${scenarios.join(', ')}\n\n  npm run record -- auth`,
  );
  process.exit(1);
}

/* ── Проверки до запуска ──────────────────────────────────────────── */

const base = `http://localhost:${port}`;
try {
  const response = await fetch(base, { signal: AbortSignal.timeout(4000) });
  if (!response.ok) throw new Error('ответ ' + response.status);
} catch (error) {
  console.error(`Сервер прототипов на ${base} не отвечает (${error.message}).\nЗапустите его: node tools/serve.mjs`);
  process.exit(1);
}

// Chrome берём системный: puppeteer-core своего не качает
const chromePaths = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const chrome = chromePaths.find((p) => existsSync(p));
if (!chrome) {
  console.error('Не нашёл Chrome. Укажите путь в переменной окружения CHROME_PATH.');
  process.exit(1);
}

/* ── Сценарий ─────────────────────────────────────────────────────── */

const scenario = await import(pathToFileURL(join(root, 'tools', 'record', `${scenarioName}.mjs`)));
const fileName = scenario.fileName ?? scenarioName;

const frames = join(outDir, '.frames-' + scenarioName);
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const warnings = [];

const W = 1440;
const H = 900;
const browser = await launch({
  executablePath: chrome,
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb', '--lang=ru-RU'],
  // зависший снимок не должен держать кадр минутами: по умолчанию CDP ждёт 180 с
  protocolTimeout: 15000,
  // Масштаб строго 1: иначе клик во время снимка кадра уходит мимо цели
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.on('pageerror', (e) => warnings.push('ошибка страницы: ' + e.message));

/* ── Слой записи поверх страницы ──────────────────────────────────── */

// Ставится на каждой загрузке документа: переходы между страницами его не сбрасывают
await page.evaluateOnNewDocument(() => {
  const install = () => {
    if (document.getElementById('demo-caption')) return;
    const style = document.createElement('style');
    style.textContent = [
      // место под субтитр: форма не уходит под плашку
      '.auth-main{padding-bottom:150px !important}',
      '#demo-cursor{position:fixed;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;',
      'border:2px solid #fff;border-radius:50%;background:rgba(10,13,20,.38);',
      'box-shadow:0 2px 8px rgba(0,0,0,.35);z-index:2147483646;pointer-events:none;',
      'transition:transform .5s cubic-bezier(.4,0,.2,1)}',
      '#demo-ring{position:fixed;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;',
      'border:2px solid #4D42E9;border-radius:50%;z-index:2147483645;pointer-events:none;opacity:0}',
      '#demo-ring.on{animation:demo-ring .5s ease-out}',
      '@keyframes demo-ring{from{opacity:.9;transform:var(--p) scale(1)}to{opacity:0;transform:var(--p) scale(2.6)}}',
      '#demo-caption{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);',
      'width:900px;max-width:94vw;padding:14px 24px;border-radius:16px;background:rgba(10,13,20,.94);',
      "color:#fff;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;text-align:center;",
      'z-index:2147483647;pointer-events:none;box-shadow:0 8px 28px rgba(0,0,0,.28)}',
      '#demo-caption:empty{display:none}',
      '#demo-caption .sec{display:block;font-size:13px;letter-spacing:.08em;text-transform:uppercase;',
      'color:#C6D0FF;margin-bottom:5px;font-weight:600}',
      '#demo-caption .txt{display:block;font-size:19px;line-height:1.4;font-weight:500}',
      '#demo-title{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;',
      'align-items:center;justify-content:center;gap:16px;background:rgba(246,248,250,.98);',
      "font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;text-align:center;padding:0 80px;",
      'opacity:0;transition:opacity .4s ease;pointer-events:none}',
      '#demo-title.on{opacity:1}',
      '#demo-title i{font-style:normal;font-size:14px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#4D42E9}',
      '#demo-title b{font-size:40px;line-height:1.2;color:#0A0D14;letter-spacing:-.02em;max-width:1000px}',
      '#demo-title span{font-size:20px;color:#525866;max-width:860px;line-height:1.5}',
    ].join('');
    document.head.appendChild(style);
    for (const id of ['demo-ring', 'demo-cursor', 'demo-caption', 'demo-title']) {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    }
    // субтитр и курсор, оставшиеся от предыдущей страницы
    try {
      const cap = JSON.parse(sessionStorage.getItem('demo-cap') || 'null');
      if (cap) window.__demoCaption(cap[0], cap[1]);
      const xy = JSON.parse(sessionStorage.getItem('demo-xy') || 'null');
      if (xy) window.__demoAt(xy[0], xy[1], true);
    } catch (e) {}
  };
  window.__demoCaption = (s, t) => {
    const el = document.getElementById('demo-caption');
    if (!el) return;
    el.innerHTML = '';
    if (!s && !t) return;
    const sec = document.createElement('span');
    sec.className = 'sec';
    sec.textContent = s;
    const txt = document.createElement('span');
    txt.className = 'txt';
    txt.textContent = t;
    el.append(sec, txt);
  };
  window.__demoAt = (x, y, instant) => {
    for (const id of ['demo-cursor', 'demo-ring']) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (instant) el.style.transition = 'none';
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      el.style.setProperty('--p', 'translate(' + x + 'px,' + y + 'px)');
      if (instant) requestAnimationFrame(() => (el.style.transition = ''));
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
});

/** Субтитр внизу кадра: рубрика сверху, объяснение под ней. Переживает переход на другую страницу. */
const caption = (section, text) =>
  page.evaluate(
    ([s, t]) => {
      try { sessionStorage.setItem('demo-cap', JSON.stringify([s, t])); } catch (e) {}
      window.__demoCaption && window.__demoCaption(s, t);
    },
    [section, text],
  ).catch(() => {});

/**
 * Субтитр + пауза по длине текста: зритель должен успеть прочитать.
 * ~60 мс на символ, но не меньше minMs.
 */
const say = async (section, text, minMs = 2600) => {
  await caption(section, text);
  await sleep(Math.max(minMs, (section.length + text.length) * 58));
};

/** Заставка на весь кадр — ею отбивают сценарии. */
const title = async (kicker, head, sub, ms = 3800) => {
  await caption('', ''); // субтитр прошлого шага не должен пережить заставку
  await page.evaluate(
    ([k, h, s]) => {
      const el = document.getElementById('demo-title');
      el.innerHTML = '';
      const i = document.createElement('i');
      i.textContent = k;
      const b = document.createElement('b');
      b.textContent = h;
      const span = document.createElement('span');
      span.textContent = s;
      el.append(i, b, span);
      el.classList.add('on');
    },
    [kicker, head, sub],
  );
  await sleep(ms);
  await page.evaluate(() => document.getElementById('demo-title').classList.remove('on'));
  await sleep(500);
};

const at = (x, y) =>
  page.evaluate(
    ([x, y]) => {
      try { sessionStorage.setItem('demo-xy', JSON.stringify([x, y])); } catch (e) {}
      window.__demoAt && window.__demoAt(x, y);
    },
    [x, y],
  );

const where = () => page.evaluate(() => ({ url: decodeURIComponent(location.pathname), h2: document.querySelector('h2')?.innerText ?? null }));

/** Первый видимый элемент по селектору, содержащий текст (без учёта регистра). */
async function locate(text, selector, block = 'center') {
  const found = await page.evaluate(
    (a) => {
      const all = [...document.querySelectorAll(a[0])].filter(
        (n) => n.getClientRects().length > 0 && (a[1] === '' || n.innerText.replace(/\s+/g, ' ').toLowerCase().includes(a[1].toLowerCase())),
      );
      // самый вложенный из подходящих: иначе под «div с текстом» попадает вся страница
      const el = all.find((n) => !all.some((m) => m !== n && n.contains(m)));
      if (!el) return false;
      const r = el.getBoundingClientRect();
      // уже виден целиком и не под субтитром — не дёргаем прокрутку
      if (r.top >= 70 && r.bottom <= innerHeight - 150) return true;
      el.scrollIntoView({ behavior: 'smooth', block: a[2] });
      return 'scrolled';
    },
    [selector, text, block],
  );
  if (found === 'scrolled') await sleep(750);
  return !!found;
}

async function boxOf(text, selector) {
  return page.evaluate(
    (a) => {
      const all = [...document.querySelectorAll(a[0])].filter(
        (n) => n.getClientRects().length > 0 && (a[1] === '' || n.innerText.replace(/\s+/g, ' ').toLowerCase().includes(a[1].toLowerCase())),
      );
      // самый вложенный из подходящих: иначе под «div с текстом» попадает вся страница
      const el = all.find((n) => !all.some((m) => m !== n && n.contains(m)));
      if (!el) return null;
      const r = el.getClientRects()[0] ?? el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    },
    [selector, text],
  );
}

/** Нажатие: подвести курсор, дать кольцу разойтись и только потом кликнуть. */
async function click(text, selector = 'button, a') {
  const found = await locate(text, selector);
  if (!found) throw new Error('не нашёл: "' + text + '" (' + selector + ')');
  await sleep(250);
  const box = await boxOf(text, selector);
  if (!box) throw new Error('пропал после прокрутки: ' + text);
  await at(box.x, box.y);
  await sleep(550);
  await page.evaluate(() => {
    const ring = document.getElementById('demo-ring');
    ring.classList.remove('on');
    void ring.offsetWidth;
    ring.classList.add('on');
  });
  await sleep(200);
  await page.mouse.click(box.x, box.y);
  await sleep(350);
}

/** Навести курсор на элемент без клика — показать, о чём речь. */
async function point(text, selector) {
  const found = await locate(text, selector);
  if (!found) throw new Error('не нашёл: "' + text + '" (' + selector + ')');
  const box = await boxOf(text, selector);
  if (box) await at(box.x, box.y);
  await sleep(600);
}

/** Прокрутить к элементу, чтобы он оказался в кадре. */
const show = async (text, selector, block = 'center') => {
  if (!(await locate(text, selector, block))) throw new Error('не нашёл: "' + text + '" (' + selector + ')');
};

/** Набор текста по буквам в поле (по CSS-селектору). */
async function type(selector, text, delay = 120) {
  const box = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    el.focus();
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + 40), y: Math.round(r.top + r.height / 2) };
  }, selector);
  if (!box) throw new Error('нет поля ' + selector);
  await at(box.x, box.y);
  await sleep(300);
  await page.type(selector, text, { delay });
}

/** Очистить поле так, чтобы React увидел изменение. */
async function clearField(selector) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press('Backspace');
}

/** Дождаться текста на странице (проверки ЭЦП идут с анимацией). */
async function waitText(text, timeout = 12000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const ok = await page.evaluate((t) => document.body.innerText.includes(t), text).catch(() => false);
    if (ok) return;
    await sleep(150);
  }
  throw new Error('не дождался текста: ' + text);
}

/** Открыть страницу прототипа (путь относительно /project/). */
async function open(path, { reset = false } = {}) {
  await caption('', '');
  if (reset) {
    await page.evaluate(() => {
      for (const k of ['mp-users', 'mp-profile', 'mp-iin', 'mp-role', 'mp-biz-step', 'mp-biz-role', 'mp-pending-service']) localStorage.removeItem(k);
      sessionStorage.removeItem('mp-ecp-handoff');
    }).catch(() => {});
  }
  // путь передаётся как есть: кириллицу и ?query Chrome кодирует сам
  await page.goto(base + '/project/' + path, { waitUntil: 'networkidle2' });
  await sleep(1200);
}

/** Блок сценария: падение внутри не роняет запись целиком, пропуски печатаются в конце. */
async function section(name, fn) {
  try {
    await fn();
  } catch (error) {
    const place = await where().catch(() => ({}));
    warnings.push(name + ': ' + error.message + ' | ' + JSON.stringify(place));
    console.warn('[пропущено] ' + name + ' — ' + error.message + ' | ' + JSON.stringify(place));
  }
}

/* ── Съёмка ───────────────────────────────────────────────────────── */

// первая страница — до старта съёмки, чтобы видео не начиналось с белого кадра
await page.goto(base + '/project/' + (scenario.start ?? 'Вход.dc.html'), { waitUntil: 'networkidle2' });
await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
await page.reload({ waitUntil: 'networkidle2' });
await sleep(1500);

/*
 * Каждому кадру запоминаем момент съёмки: снимок длится то 60, то 300 мс
 * (загрузка страницы, шрифты), и при сборке со средней частотой видео
 * «плывёт» — субтитр оказывается над чужим экраном. Поэтому кадр держится
 * в ролике ровно столько, сколько прошло до следующего снимка.
 */
let shooting = true;
let shot = 0;
const stamps = [];
const shotErrors = new Map();
/*
 * Снимаем напрямую через CDP, а не page.screenshot(): у puppeteer снимки идут
 * в очередь, и один снимок, зависший на переходе между страницами, держит всю
 * очередь до protocolTimeout — в ролике это 15 секунд стоп-кадра. Здесь снимок
 * ждём не дольше секунды, зависший бросаем и снимаем следующий.
 */
const cdp = await page.createCDPSession();
const recorder = (async () => {
  while (shooting) {
    const started = Date.now();
    try {
      const res = await Promise.race([
        cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90, optimizeForSpeed: true }),
        sleep(1000).then(() => { throw new Error('снимок дольше 1 с'); }),
      ]);
      writeFileSync(join(frames, String(shot).padStart(5, '0') + '.jpg'), Buffer.from(res.data, 'base64'));
      stamps.push(started);
      shot++;
    } catch (e) {
      // кадр во время перехода между страницами — пропускаем, но считаем
      shotErrors.set(e.message.slice(0, 120), (shotErrors.get(e.message.slice(0, 120)) ?? 0) + 1);
    }
    await sleep(Math.max(0, 100 - (Date.now() - started)));
  }
})();

console.log(`Снимаю «${scenario.title ?? scenarioName}»…`);
const startedAt = Date.now();

await scenario.default({ page, sleep, caption, say, title, click, point, show, locate, at, type, clearField, waitText, open, section, where });

await caption('', '');
await sleep(300);
shooting = false;
await recorder;
await browser.close();

const endedAt = Date.now();
const seconds = (endedAt - startedAt) / 1000;
let maxGap = 0;
for (let i = 1; i < stamps.length; i++) maxGap = Math.max(maxGap, stamps[i] - stamps[i - 1]);
console.log(`Кадров: ${shot}, длительность: ${seconds.toFixed(0)} с, в среднем ${(shot / seconds).toFixed(1)} к/с, самая длинная пауза между кадрами ${(maxGap / 1000).toFixed(1)} с`);

/* ── Сборка видео ─────────────────────────────────────────────────── */

mkdirSync(outDir, { recursive: true });
const mp4 = join(outDir, fileName + '.mp4');

// concat-список: у каждого кадра своя длительность (см. stamps выше)
const list = [];
for (let i = 0; i < shot; i++) {
  const next = i + 1 < shot ? stamps[i + 1] : endedAt;
  list.push(`file '${String(i).padStart(5, '0')}.jpg'`, `duration ${((next - stamps[i]) / 1000).toFixed(3)}`);
}
list.push(`file '${String(shot - 1).padStart(5, '0')}.jpg'`); // последний кадр дублируется — требование concat
writeFileSync(join(frames, 'list.txt'), list.join('\n'));

console.log('Собираю mp4…');
// ffmpeg на Windows не открывает абсолютные пути с кириллицей («Личные данные»),
// поэтому запускаем его из папки кадров и передаём только относительные пути
execFileSync(
  ffmpeg.path,
  [
    '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', 'list.txt',
    // выход 30 к/с: плеерам и мессенджерам проще, тайминг кадров сохраняется
    '-vf', 'fps=30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '23', '-preset', 'slow',
    '-movflags', '+faststart', '../' + fileName + '.mp4',
  ],
  { cwd: frames, stdio: ['ignore', 'ignore', 'inherit'] },
);

if (!keepFrames) rmSync(frames, { recursive: true, force: true });

const mb = (file) => (existsSync(file) ? (statSync(file).size / 1048576).toFixed(1) + ' МБ' : '—');
console.log(`\nГотово: exports/video/${fileName}.mp4  (${mb(mp4)})`);
if (shotErrors.size) console.log('Не снятые кадры:', [...shotErrors].map(([m, n]) => n + ' × ' + m).join('; '));
if (warnings.length) {
  console.log(`\nПропущено шагов: ${warnings.length}:`);
  for (const w of warnings) console.log(' - ' + w);
} else {
  console.log('Все шаги сценария прошли.');
}
