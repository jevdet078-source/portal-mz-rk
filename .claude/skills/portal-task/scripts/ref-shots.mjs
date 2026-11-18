// ref-shots.mjs — снимки HTML-прототипа аналитика (архив Google Stitch / свой HTML) для разбора референса.
//
//   node .claude/skills/portal-task/scripts/ref-shots.mjs "<распакованная папка>" "<папка для PNG>" [ширина=1440]
//
// Открывает каждый .html в папке (рекурсивно) в безголовом Chrome, без доступа в интернет из страницы
// (кроме шрифтов и CDN-стилей — их пропускаем, чтобы референс выглядел как задумано), и снимает всю страницу.
// Скрипт лежит вне папки референса и запускается из корня репо — код референса не исполняется как Node.
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, '../../../../package.json'));
const { launch } = require('puppeteer-core');

const [, , srcArg, outArg, wArg] = process.argv;
if (!srcArg || !outArg) { console.error('ref-shots.mjs "<папка>" "<папка для PNG>" [ширина]'); process.exit(1); }
const src = resolve(srcArg), out = resolve(outArg), width = +wArg || 1440;
mkdirSync(out, { recursive: true });
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.html?$/i.test(f) ? [p] : []; });
const files = walk(src);
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
  .find((p) => p && existsSync(p));
const browser = await launch({ executablePath: chrome, headless: true });
const ALLOW = /fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|unpkg\.com|cdn\.tailwindcss\.com/;
for (const f of files) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.setRequestInterception(true);
  page.on('request', (r) => { const u = r.url(); if (/^https?:/.test(u) && !ALLOW.test(u)) r.abort(); else r.continue(); });
  try {
    await page.goto(pathToFileURL(f).href, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 600));
    const name = relative(src, f).replace(/[\\/]/g, '__').replace(/\.html?$/i, '') + '.png';
    await page.screenshot({ path: join(out, name), fullPage: true });
    console.log('✓', name);
  } catch (e) { console.log('✗', relative(src, f), e.message.slice(0, 80)); }
  await page.close();
}
await browser.close();
