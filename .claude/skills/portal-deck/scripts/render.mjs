// render.mjs — рендер HTML-слайдов 1920×1080 в PNG 4K и PDF + проверка вёрстки.
//
//   node .claude/skills/portal-deck/scripts/render.mjs "<папка презентации>" [фильтр имени]
//
// Берёт каждый <папка>/src/*.html → <папка>/<имя>.png (3840×2160) и <папка>/<имя>.pdf (страница 16:9
// из той же картинки: градиенты, тени и прозрачность везде выглядят одинаково). С флагом --deck
// дополнительно собирает все PDF в один «<папка>/<имя папки>.pdf» по алфавиту файлов.
// Готовность слайда — body[data-ready="1"] (если атрибута нет, ждём 1,5 с).
// Проверки: элемент за холстом, переполнение контейнера, текст мельче 18 px, не загрузилась иконка
// RemixIcon или картинка. Элемент можно освободить от проверки «за холстом» атрибутом data-bleed.
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, '../../../../package.json'));
const puppeteer = require('puppeteer-core');

const args = process.argv.slice(2);
const deckDir = resolve(args.find((a) => !a.startsWith('--')) || '.');
const filter = args.filter((a) => !a.startsWith('--'))[1] || '';
const src = join(deckDir, 'src');
const files = readdirSync(src).filter((f) => f.endsWith('.html') && f.includes(filter)).sort();
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => p && existsSync(p));
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
const pngs = [];
let problems = 0;
for (const f of files) {
  const name = f.replace(/\.html$/, '');
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(join(src, f)).href, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('body[data-ready="1"]', { timeout: 8000 }).catch(() => new Promise((r) => setTimeout(r, 1500)));
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
  await new Promise((r) => setTimeout(r, 300));
  const issues = await page.evaluate(() => {
    const out = [];
    const root = document.querySelector('.slide') || document.body;
    for (const el of root.querySelectorAll('*')) {
      if (el.closest('svg')) continue;
      const r = el.getBoundingClientRect(); if (!r.width) continue;
      const s = getComputedStyle(el);
      if ((r.right > 1920.5 || r.bottom > 1080.5 || r.left < -0.5 || r.top < -0.5) && !el.closest('[data-bleed]')) out.push('за холстом: ' + (el.className || el.tagName) + ' ' + Math.round(r.right) + '×' + Math.round(r.bottom));
      if (el.scrollWidth > el.clientWidth + 1 && s.overflow !== 'visible') out.push('переполнение: ' + (el.className || el.tagName));
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (own && parseFloat(s.fontSize) < 18) out.push('мелкий текст ' + s.fontSize + ': «' + el.textContent.trim().slice(0, 30) + '»');
    }
    for (const i of root.querySelectorAll('i[class*="ri-"]')) { const c = getComputedStyle(i, '::before').content; if (c === 'none' || c === '""') out.push('нет иконки: ' + i.className); }
    for (const img of root.querySelectorAll('img')) if (!img.complete || !img.naturalWidth) out.push('не загрузилась картинка: ' + img.getAttribute('src'));
    return [...new Set(out)];
  });
  const pngPath = join(deckDir, name + '.png');
  await page.screenshot({ path: pngPath });
  const png = readFileSync(pngPath).toString('base64');
  const pdfPage = await browser.newPage();
  await pdfPage.setContent('<style>@page{size:1920px 1080px;margin:0}html,body{margin:0}img{display:block;width:1920px;height:1080px}</style><img src="data:image/png;base64,' + png + '">', { waitUntil: 'load' });
  await pdfPage.pdf({ path: join(deckDir, name + '.pdf'), width: '1920px', height: '1080px', printBackground: true, pageRanges: '1' });
  await pdfPage.close();
  pngs.push(png);
  problems += issues.length;
  console.log((issues.length ? '⚠ ' : '✓ ') + name + (issues.length ? '\n  ' + issues.join('\n  ') : ''));
  await page.close();
}
if (args.includes('--deck') && pngs.length) {
  const p = await browser.newPage();
  await p.setContent('<style>@page{size:1920px 1080px;margin:0}html,body{margin:0}img{display:block;width:1920px;height:1080px;page-break-after:always}</style>'
    + pngs.map((b) => '<img src="data:image/png;base64,' + b + '">').join(''), { waitUntil: 'load' });
  const out = join(deckDir, basename(deckDir) + '.pdf');
  await p.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true });
  console.log('→ ' + out + ' (' + pngs.length + ' стр.)');
}
await browser.close();
console.log(problems ? `Замечаний: ${problems} — исправить и перерендерить.` : 'Замечаний нет.');
