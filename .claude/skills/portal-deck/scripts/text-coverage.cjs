// text-coverage.cjs — сверка текста презентации с исходником: ничего не потеряли и ничего не добавили.
//
//   node .claude/skills/portal-deck/scripts/text-coverage.cjs "<исходник.pptx|.txt>" "<слайд.html>|<ещё.html>|<итог.pptx>" "<node_modules с jszip>"
//
// Исходник .pptx — абзацы из ppt/slides/slide*.xml; .txt — одна фраза на строку.
// Итог — HTML-слайды (видимый текст после отрисовки) и/или .pptx.
// Печатает: потерянные фразы исходника, фразы итога, которых нет в исходнике (добавлено от себя),
// и число слайдов там и там. Код выхода 1, если есть потери или добавки.
'use strict';
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const [, , srcArg, outArg, nmArg] = process.argv;
if (!srcArg || !outArg) { console.error('text-coverage.cjs "<исходник>" "<итог1>|<итог2>" "<node_modules с jszip>"'); process.exit(2); }
const NM = nmArg || process.env.PPTXGENJS_NM || '';
const repoRoot = path.resolve(__dirname, '../../../..');

const norm = (s) => s.replace(/[\u00A0\u202F\u2009]/g, ' ').replace(/[«»“”„"]/g, '"').replace(/[‐‑‒–—−]/g, '-').replace(/ё/g, 'е').replace(/Ё/g, 'Е')
  .replace(/\s+/g, ' ').trim().toLowerCase();
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

async function pptxParas(file) {
  const JSZip = require(path.join(NM, 'jszip'));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const slides = Object.keys(zip.files).filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f)).sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0]);
  const paras = [];
  for (const f of slides) {
    const xml = await zip.file(f).async('string');
    for (const p of xml.split('</a:p>')) { const t = dec((p.match(/<a:t>([^<]*)<\/a:t>/g) || []).map((x) => x.slice(5, -6)).join('')); if (t.trim()) paras.push(t); }
  }
  return { paras, slides: slides.length };
}
async function htmlParas(files) {
  const { launch } = require(path.join(repoRoot, 'node_modules', 'puppeteer-core'));
  const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find((p) => p && fs.existsSync(p));
  const browser = await launch({ executablePath: chrome, headless: true });
  const paras = [];
  for (const f of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(pathToFileURL(path.resolve(f)).href, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 500));
    const t = await page.evaluate(() => (document.querySelector('.slide') || document.body).innerText);
    paras.push(...t.split('\n').filter((x) => x.trim()));
    await page.close();
  }
  await browser.close();
  return { paras, slides: files.length };
}
async function read(spec) {
  const files = spec.split('|').map((s) => s.trim()).filter(Boolean);
  const res = { paras: [], slides: 0 };
  const html = files.filter((f) => /\.html?$/i.test(f));
  for (const f of files.filter((x) => /\.pptx$/i.test(x))) { const r = await pptxParas(f); res.paras.push(...r.paras); res.slides += r.slides; }
  for (const f of files.filter((x) => /\.txt$/i.test(x))) { const l = fs.readFileSync(f, 'utf8').split(/\r?\n/).filter((x) => x.trim()); res.paras.push(...l); res.slides += 1; }
  if (html.length) { const r = await htmlParas(html); res.paras.push(...r.paras); res.slides += r.slides; }
  return res;
}

(async () => {
  const src = await read(srcArg), out = await read(outArg);
  const srcAll = norm(src.paras.join(' ')), outAll = norm(out.paras.join(' '));
  const lost = src.paras.filter((p) => norm(p).replace(/[^a-zа-яәіңғүұқөһ]/gi, '').length > 2 && !outAll.includes(norm(p)));
  // фраза итога «добавлена», если её нет в исходнике целиком (служебные «01», «→» и т. п. игнорируем)
  const added = out.paras.filter((p) => norm(p).replace(/[^a-zа-я]/gi, '').length > 2 && !srcAll.includes(norm(p)));
  console.log(`Слайдов: исходник ${src.slides}, итог ${out.slides}. Фраз исходника: ${src.paras.length}, найдено ${src.paras.length - lost.length}.`);
  if (lost.length) console.log('\nПОТЕРЯНО (' + lost.length + '):\n  • ' + lost.join('\n  • '));
  if (added.length) console.log('\nДОБАВЛЕНО ОТ СЕБЯ (' + added.length + ') — убрать или согласовать:\n  • ' + added.join('\n  • '));
  if (!lost.length && !added.length) console.log('Текст совпадает с исходником: ничего не потеряно и не добавлено.');
  process.exit(lost.length || added.length ? 1 : 0);
})();
