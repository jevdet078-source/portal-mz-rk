/**
 * Выгрузка прототипов для просмотра без сервера — двойным кликом, в том числе без интернета.
 *
 *   node tools/export.mjs
 *   → exports/portal-mz-rk/            папка: страницы, runtime, картинки
 *   → exports/portal-mz-rk.zip         архив для отправки
 *
 * Как это работает.
 * .dc.html подтягивают соседние компоненты через fetch(), а на file:// fetch запрещён.
 * Поэтому в сборку кладётся runtime/files.js — все .dc.html, image-slot.js и состояние слотов
 * картинок — и подмена window.fetch, которая отдаёт эти файлы из памяти.
 * React, ReactDOM, шрифт Inter и иконки RemixIcon скачиваются один раз (tools/.cache)
 * и подключаются локально, ссылки на CDN из страниц убираются.
 * Картинки (assets/, uploads/) лежат рядом и грузятся обычными относительными путями.
 * Имена страниц не меняются — ссылки между страницами, ?query и #hash работают как на сервере.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'project');
const OUT_NAME = 'portal-mz-rk';
const OUT = path.join(ROOT, 'exports', OUT_NAME);
const ZIP = path.join(ROOT, 'exports', OUT_NAME + '.zip');
const CACHE = path.join(ROOT, 'tools', '.cache');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const REACT = 'https://unpkg.com/react@18.3.1/umd/react.production.min.js';
const REACT_DOM = 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js';
const INTER_CSS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
const REMIX_CSS = 'https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css';
const REMIX_WOFF2 = 'https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.woff2';

async function cached(url, name) {
  const file = path.join(CACHE, name);
  if (!fs.existsSync(file)) {
    const res = await fetch(url, { headers: { 'user-agent': UA } });
    if (!res.ok) throw new Error(`не удалось скачать ${url}: HTTP ${res.status}`);
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return fs.readFileSync(file);
}

/**
 * Упаковка папки в zip без внешних утилит.
 * Имена кириллические, поэтому: UTF-8 с флагом кодировки (бит 11) — иначе проводник Windows
 * распакует «ЋвЄалвм»; прямые слэши — иначе на macOS/Linux появятся файлы с «\» в имени.
 */
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  if (typeof zlib.crc32 === 'function') return zlib.crc32(buf) >>> 0;
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function zipDirectory(dir, zipPath, rootName) {
  const entries = [];
  const walk = (abs, rel) => {
    for (const e of fs.readdirSync(abs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(abs, e.name), name = rel + '/' + e.name;
      if (e.isDirectory()) walk(full, name); else entries.push({ full, name });
    }
  };
  walk(dir, rootName);

  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const UTF8_FLAG = 0x0800;
  const parts = [], central = [];
  let offset = 0;

  for (const e of entries) {
    const data = fs.readFileSync(e.full);
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    const deflate = deflated.length < data.length;
    const body = deflate ? deflated : data;
    const method = deflate ? 8 : 0;
    const crc = crc32(data);
    const name = Buffer.from(e.name, 'utf8');

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(UTF8_FLAG, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    parts.push(local, name, body);

    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0);
    cen.writeUInt16LE(20, 4);
    cen.writeUInt16LE(20, 6);
    cen.writeUInt16LE(UTF8_FLAG, 8);
    cen.writeUInt16LE(method, 10);
    cen.writeUInt16LE(dosTime, 12);
    cen.writeUInt16LE(dosDate, 14);
    cen.writeUInt32LE(crc, 16);
    cen.writeUInt32LE(body.length, 20);
    cen.writeUInt32LE(data.length, 24);
    cen.writeUInt16LE(name.length, 28);
    cen.writeUInt32LE(offset, 42);
    central.push(cen, name);

    offset += local.length + name.length + body.length;
  }

  const centralSize = central.reduce((sum, b) => sum + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  fs.writeFileSync(zipPath, Buffer.concat([...parts, ...central, end]));
}

const write = (rel, data) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

const RUNTIME_HEAD = [
  '<link rel="stylesheet" href="runtime/inter.css">',
  '<link rel="stylesheet" href="runtime/remixicon.css">',
  '<script src="runtime/react.production.min.js"></script>',
  '<script src="runtime/react-dom.production.min.js"></script>',
  '<script src="runtime/files.js"></script>',
  '<script src="runtime/support.js"></script>',
].join('\n');

/** Убирает подключения шрифтов и иконок с CDN и подменяет рантайм на локальный. */
function transform(text) {
  return text
    .replace(/[ \t]*<link\b[^>]*(fonts\.googleapis\.com|fonts\.gstatic\.com|remixicon)[^>]*>\r?\n?/g, '')
    .replace(/<script\s+src="\.\/support\.js"\s*><\/script>/, RUNTIME_HEAD);
}

const FETCH_SHIM = `
(function () {
  var files = window.__EXPORT_FILES || {};
  var nativeFetch = window.fetch ? window.fetch.bind(window) : null;
  function fileKey(input) {
    try {
      var url = String(input && input.url ? input.url : input);
      if (/^(https?:|data:|blob:)/i.test(url) && url.indexOf(location.origin) !== 0) return null;
      url = url.split('#')[0].split('?')[0];
      return decodeURIComponent(url.substring(url.lastIndexOf('/') + 1));
    } catch (e) { return null; }
  }
  function mime(key) {
    return /\\.json$/.test(key) ? 'application/json' : /\\.js$/.test(key) ? 'text/javascript' : 'text/html';
  }
  window.fetch = function (input, init) {
    var method = (init && init.method) || (input && input.method) || 'GET';
    var key = fileKey(input);
    if (String(method).toUpperCase() === 'GET' && key && Object.prototype.hasOwnProperty.call(files, key)) {
      return Promise.resolve(new Response(files[key], { status: 200, headers: { 'Content-Type': mime(key) + '; charset=utf-8' } }));
    }
    if (nativeFetch) return nativeFetch(input, init);
    return Promise.reject(new Error('fetch недоступен: ' + key));
  };
})();
`;

const GROUPS = [
  { title: 'Портал', desc: 'Публичная часть для граждан, бизнеса и медперсонала', icon: 'ri-government-line', pages: [
    'Портал Минздрава - Главная', 'Вход', 'Паспорт услуги', 'Каталог услуг', 'Медорганизации', 'ОСМС', 'Лекарства',
    'Заболевания', 'Вакцинация', 'Беременность', 'Здоровье детей', 'Экстренная помощь', 'Новости',
    'Клинические протоколы', 'Присвоение категории' ] },
  { title: 'Кабинет бизнеса · «Единое окно»', desc: 'Подача заявок на лекарственные средства и медицинские изделия', icon: 'ri-briefcase-4-line', pages: [
    'Кабинет бизнеса', 'Услуги', 'Паспорт регистрации цены', 'Заявка на регистрацию цены', 'Заявление КНФ',
    'Мои процессы', 'Процесс', 'Договора', 'Платежи', 'Уведомления', 'Рабочий календарь' ] },
  { title: 'Кабинеты гражданина и врача', desc: '', icon: 'ri-user-heart-line', pages: [ 'Личный кабинет', 'Кабинет врача' ] },
  { title: 'Компоненты', desc: 'Общие блоки и витрины компонентов дизайн-системы', icon: 'ri-shapes-line', pages: [
    'Header', 'Footer', 'Assistant', 'BusinessNav', 'Table', 'FileUpload', 'Dropdown', 'DatePicker', 'Toast' ] },
];

function indexHtml(pages) {
  const known = new Set(GROUPS.flatMap((g) => g.pages));
  const groups = GROUPS.map((g) => ({ ...g, pages: g.pages.filter((p) => pages.includes(p)) }));
  const rest = pages.filter((p) => !known.has(p));
  if (rest.length) groups.push({ title: 'Прочее', desc: '', icon: 'ri-file-list-3-line', pages: rest });
  const link = (p) => `<a class="card" href="${encodeURI(p)}.dc.html">${p}<i class="ri-arrow-right-line"></i></a>`;
  const scenario = [
    ['Портал Минздрава - Главная.dc.html#pharma', 'Главная → «Бизнесу» → «Фармацевтика»'],
    ['Паспорт услуги.dc.html#price-ls', 'Паспорт услуги → «Получить услугу» → вход с ЭЦП, профиль «Бизнес»'],
    ['Договора.dc.html', 'Подготовка: договор (НЦЭЛС → «Сохранить договор») и заявка на платёж'],
    ['Кабинет бизнеса.dc.html', '«Продолжить подачу» → заявка → «Подписать и отправить»'],
    ['Услуги.dc.html', 'Заявка в реестре «Услуги», сквозной процесс — в «Моих процессах»'],
  ];
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Портал МЗ РК — прототип</title>
<link rel="stylesheet" href="runtime/inter.css">
<link rel="stylesheet" href="runtime/remixicon.css">
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:'Inter',system-ui,sans-serif;background:#F6F8FA;color:#0A0D14;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1040px;margin:0 auto;padding:40px 24px 64px}
  .hero{background:linear-gradient(160deg,#4D42E9,#362DA6);color:#fff;border-radius:20px;padding:32px;display:flex;gap:24px;align-items:center;flex-wrap:wrap}
  .hero h1{margin:0 0 6px;font-size:26px;font-weight:600;letter-spacing:-.02em}
  .hero p{margin:0;color:rgba(255,255,255,.85);font-size:14px;line-height:1.55;max-width:560px}
  .hero .actions{margin-left:auto;display:flex;gap:10px;flex-wrap:wrap}
  .btn{height:44px;padding:0 18px;border-radius:12px;display:inline-flex;align-items:center;gap:8px;font:600 14px 'Inter',sans-serif;text-decoration:none;border:none;cursor:pointer}
  .btn.primary{background:#fff;color:#312D86}
  .btn.ghost{background:rgba(255,255,255,.14);color:#fff}
  .note{margin-top:16px;display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:#FEF3EB;border:1px solid #FFDAC2;font-size:13px;line-height:1.5;color:#20232D}
  .note i{color:#F17B2C;font-size:18px}
  h2{display:flex;align-items:center;gap:10px;margin:36px 0 4px;font-size:18px;font-weight:600}
  h2 i{width:34px;height:34px;border-radius:10px;background:#EEF2FF;color:#4D42E9;display:inline-flex;align-items:center;justify-content:center;font-size:18px}
  .desc{margin:0 0 14px 44px;font-size:13px;color:#525866}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
  .card{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 16px;background:#fff;border:1px solid #E2E4E9;border-radius:12px;text-decoration:none;color:#31353F;font-size:14px;font-weight:500;transition:.15s}
  .card i{color:#CDD0D5;font-size:18px;transition:.15s}
  .card:hover{border-color:#4D42E9;color:#4D42E9;box-shadow:0 8px 16px rgba(10,13,20,.06)}
  .card:hover i{color:#4D42E9}
  .scenario{margin-top:24px;background:#fff;border:1px solid #E2E4E9;border-radius:16px;padding:20px 22px}
  .scenario h3{margin:0 0 12px;font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}
  .scenario ol{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;counter-reset:s}
  .scenario li{display:flex;gap:12px;align-items:center;counter-increment:s;font-size:13.5px;color:#31353F}
  .scenario li::before{content:counter(s);width:24px;height:24px;border-radius:50%;background:#4D42E9;color:#fff;font-size:12px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}
  .scenario a{color:#4D42E9;text-decoration:none;font-weight:500}
  .toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0A0D14;color:#fff;padding:10px 16px;border-radius:10px;font-size:13px;opacity:0;transition:.2s;pointer-events:none}
  .toast.show{opacity:1}
  footer{margin-top:40px;font-size:12px;color:#868C98}
</style>
</head>
<body>
<div class="wrap">
  <div class="hero">
    <div>
      <h1>Портал Министерства здравоохранения РК</h1>
      <p>Интерактивный прототип: публичный портал, кабинеты гражданина, врача и бизнеса («Единое окно» для заявок на ЛС и МИ). Работает без сервера и без интернета.</p>
    </div>
    <div class="actions">
      <a class="btn primary" href="${encodeURI('Портал Минздрава - Главная')}.dc.html"><i class="ri-play-circle-line"></i>Открыть портал</a>
      <button class="btn ghost" id="reset" type="button"><i class="ri-refresh-line"></i>Сбросить демо-данные</button>
    </div>
  </div>
  <div class="note" id="browser-note"><i class="ri-information-line"></i><span>Открывайте в <b>Google Chrome</b>, <b>Microsoft Edge</b> или <b>Яндекс Браузере</b>. Прототип запоминает вход, роль и шаги подачи заявки между страницами — в Firefox для локальных файлов это не работает.</span></div>

  <div class="scenario">
    <h3><i class="ri-route-line" style="color:#4D42E9"></i>Сценарий для показа: бизнес подаёт заявку на регистрацию цены</h3>
    <ol>${scenario.map(([href, text]) => `<li><a href="${encodeURI(href.split('#')[0])}${href.includes('#') ? '#' + href.split('#')[1] : ''}">${text}</a></li>`).join('')}</ol>
  </div>

  ${groups.map((g) => `<h2><i class="${g.icon}"></i>${g.title}</h2>${g.desc ? `<p class="desc">${g.desc}</p>` : '<p class="desc"></p>'}<div class="grid">${g.pages.map(link).join('')}</div>`).join('\n  ')}

  <footer>Сборка: ${new Date().toLocaleString('ru-RU')} · ${pages.length} страниц и компонентов</footer>
</div>
<div class="toast" id="toast">Демо-данные сброшены</div>
<script>
  if (/firefox/i.test(navigator.userAgent)) {
    document.getElementById('browser-note').style.background = '#FDEDF0';
  }
  document.getElementById('reset').addEventListener('click', function () {
    try { Object.keys(localStorage).filter(function (k) { return k.indexOf('mp-') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
    var t = document.getElementById('toast'); t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 1800);
  });
</script>
</body>
</html>`;
}

const README = `ПОРТАЛ МЗ РК — ИНТЕРАКТИВНЫЙ ПРОТОТИП

Как открыть
1. Распакуйте архив в любую папку (не открывайте файлы прямо из архива).
2. Зайдите в папку portal-mz-rk.
3. Двойным кликом откройте файл «Портал Минздрава - Главная.dc.html» —
   сразу откроется главная страница портала.
4. Смотрите в Google Chrome, Microsoft Edge или Яндекс Браузере.

Дальше переходы работают как на обычном сайте: меню «Гражданам», «Бизнесу»,
«Медперсоналу», карточки услуг, кнопки входа.

Полный список страниц, сценарий показа и кнопка «Сбросить демо-данные» —
в файле «00 — Открыть прототип.html».

Интернет и сервер не нужны. Прототип запоминает вход, выбранную роль и шаги подачи
заявки между страницами.

Поля форм в кабинете бизнеса статичные: это демонстрация пути заявителя,
а не рабочая система.
`;

async function main() {
  const t0 = Date.now();
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // runtime: React, рантайм .dc.html
  write('runtime/react.production.min.js', await cached(REACT, 'react.production.min.js'));
  write('runtime/react-dom.production.min.js', await cached(REACT_DOM, 'react-dom.production.min.js'));
  write('runtime/support.js', fs.readFileSync(path.join(SRC, 'support.js')));

  // Inter — локальные woff2 вместо Google Fonts
  let interCss = (await cached(INTER_CSS, 'inter.css')).toString('utf8');
  const fontUrls = [...new Set(interCss.match(/https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2/g) || [])];
  for (const url of fontUrls) {
    const name = 'inter-' + path.basename(url);
    write('runtime/fonts/' + name, await cached(url, name));
    interCss = interCss.split(url).join('fonts/' + name);
  }
  write('runtime/inter.css', interCss);

  // RemixIcon — только woff2
  const remixCss = (await cached(REMIX_CSS, 'remixicon.css')).toString('utf8')
    .replace(/@font-face\s*\{[^}]*\}/, '@font-face{font-family:"remixicon";src:url("fonts/remixicon.woff2") format("woff2");font-display:block;}');
  write('runtime/remixicon.css', remixCss);
  write('runtime/fonts/remixicon.woff2', await cached(REMIX_WOFF2, 'remixicon.woff2'));

  // страницы и встроенная карта файлов для fetch
  const dcFiles = fs.readdirSync(SRC).filter((f) => f.endsWith('.dc.html')).sort((a, b) => a.localeCompare(b, 'ru'));
  const files = {};
  for (const f of dcFiles) {
    const text = transform(fs.readFileSync(path.join(SRC, f), 'utf8'));
    files[f] = text;
    write(f, text);
  }
  files['image-slot.js'] = fs.readFileSync(path.join(SRC, 'image-slot.js'), 'utf8');
  const stateFile = path.join(SRC, '.image-slots.state.json');
  if (fs.existsSync(stateFile)) files['.image-slots.state.json'] = fs.readFileSync(stateFile, 'utf8');
  write('runtime/files.js', 'window.__EXPORT_FILES = ' + JSON.stringify(files) + ';\n' + FETCH_SHIM);

  // картинки: вся папка assets и упомянутые файлы из uploads
  fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });
  const all = Object.values(files).join('\n');
  const uploads = [...new Set(all.match(/uploads\/[^"'\s)<>]+\.(?:jpe?g|png|svg|webp|gif)/g) || [])];
  for (const rel of uploads) {
    const from = path.join(SRC, rel);
    if (fs.existsSync(from)) write(rel, fs.readFileSync(from));
    else console.warn('  ! нет файла', rel);
  }

  // проверка: все относительные картинки на месте
  const missing = [...new Set(all.match(/assets\/[\w.-]+\.(?:png|svg|jpe?g)/g) || [])].filter((rel) => !fs.existsSync(path.join(OUT, rel)));
  if (missing.length) console.warn('  ! не найдены картинки:', missing.join(', '));

  const pages = dcFiles.map((f) => f.replace(/\.dc\.html$/, ''));
  write('00 — Открыть прототип.html', indexHtml(pages));
  write('Как открыть.txt', README);

  // архив
  fs.rmSync(ZIP, { force: true });
  zipDirectory(OUT, ZIP, OUT_NAME);
  const zipped = fs.existsSync(ZIP);

  const size = (p) => {
    let total = 0;
    const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const full = path.join(d, e.name); e.isDirectory() ? walk(full) : (total += fs.statSync(full).size); } };
    fs.statSync(p).isDirectory() ? walk(p) : (total = fs.statSync(p).size);
    return (total / 1024 / 1024).toFixed(1) + ' МБ';
  };
  console.log(`Готово за ${((Date.now() - t0) / 1000).toFixed(1)} с`);
  console.log(`  страниц и компонентов: ${dcFiles.length}, шрифтов Inter: ${fontUrls.length}, картинок из uploads: ${uploads.length}`);
  console.log(`  папка: ${OUT} (${size(OUT)})`);
  console.log(zipped ? `  архив: ${ZIP} (${size(ZIP)})` : '  архив не создан — заархивируйте папку вручную');
}

main().catch((e) => { console.error(e); process.exit(1); });
