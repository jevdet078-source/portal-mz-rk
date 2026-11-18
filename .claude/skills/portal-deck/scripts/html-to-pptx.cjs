// html-to-pptx.cjs — редактируемый PPTX из HTML-слайда 1920×1080: живой текст, нативные фигуры, иконки
// и картинки отдельными объектами, сложный фон (градиенты, свечения, декор-SVG) — одной картинкой.
//
//   npm install --prefix "<scratchpad>/pptx" pptxgenjs@3.12.0          (один раз за сессию)
//   node .claude/skills/portal-deck/scripts/html-to-pptx.cjs "<слайд.html>" "<выход.pptx>" "<scratchpad>/pptx/node_modules"
//   (несколько слайдов в один файл: перечислить html через «|» в первом аргументе)
//
// Как устроен слайд-источник: холст 1920×1080, корень .slide (или body), готовность — body[data-ready="1"]
// (если атрибута нет, ждём networkidle). Подсказки разметкой:
//   data-pptx="bg"    — элемент целиком уходит в фоновую картинку (декор, сложная графика);
//   data-pptx="pic"   — элемент целиком отдельной картинкой (скриншот портала в рамке, схема);
//   data-pptx="skip"  — не переносить.
// Масштаб: 1920 px холста = 13,333″ слайда, поэтому 1 px = 0,5 pt.
'use strict';
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const [, , srcArg, outArg, nmArg] = process.argv;
if (!srcArg || !outArg) { console.error('html-to-pptx.cjs "<слайд.html>[|<ещё.html>]" "<выход.pptx>" "<node_modules с pptxgenjs>"'); process.exit(1); }
const NM = nmArg || process.env.PPTXGENJS_NM || '';
const PptxGenJS = require(path.join(NM, 'pptxgenjs'));
const repoRoot = path.resolve(__dirname, '../../../..');
const { launch } = require(path.join(repoRoot, 'node_modules', 'puppeteer-core'));

const PX = 13.333 / 1920; // дюймов в пикселе холста
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
  .find((p) => p && fs.existsSync(p));

// Сбор геометрии в браузере
function collect() {
  const root = document.querySelector('.slide') || document.body;
  const R = (el) => el.getBoundingClientRect();
  const vis = (el) => { const s = getComputedStyle(el); return el.getClientRects().length && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.02; };
  const mark = (el, kind) => el.setAttribute('data-pptx-k', kind);
  const id = (() => { let n = 0; return (el) => { if (!el.dataset.pptxId) el.dataset.pptxId = 'p' + (++n); return el.dataset.pptxId; }; })();
  const skipZone = (el) => el.closest('[data-pptx="bg"],[data-pptx="pic"],[data-pptx="skip"]');
  const out = { shapes: [], texts: [], pics: [] };
  const rgba = (c) => { const m = (c || '').match(/[\d.]+/g); if (!m) return null; const [r, g, b, a = 1] = m.map(Number); return { hex: [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase(), a: +a }; };
  const all = Array.from(root.querySelectorAll('*'));

  // картинки: <img>, иконки RemixIcon, небольшие SVG, data-pptx="pic"
  for (const el of all) {
    if (!vis(el) || (skipZone(el) && el.getAttribute('data-pptx') !== 'pic')) continue;
    const r = R(el); if (r.width < 2 || r.height < 2) continue;
    const isPic = el.getAttribute('data-pptx') === 'pic' || el.tagName === 'IMG' || /\bri-/.test(el.className && el.className.baseVal === undefined ? el.className : '')
      || (el.tagName.toLowerCase() === 'svg' && !el.parentElement.closest('svg') && r.width <= 400 && r.height <= 400);
    if (isPic) { out.pics.push({ id: id(el), x: r.left, y: r.top, w: r.width, h: r.height }); mark(el, 'pic'); }
  }
  const inPic = (el) => el.closest('[data-pptx-k="pic"]');
  // фигуры: сплошная заливка и/или обводка, без градиента
  for (const el of all) {
    if (!vis(el) || skipZone(el) || inPic(el) || el.closest('svg')) continue;
    const s = getComputedStyle(el), r = R(el);
    if ((r.width < 4 && r.height < 4) || r.width < 0.5 || r.height < 0.5) continue; // 1-пиксельный разделитель — оставляем
    const bg = rgba(s.backgroundColor), bw = parseFloat(s.borderTopWidth) || 0, bc = rgba(s.borderTopColor);
    const hasFill = bg && bg.a > 0.01 && s.backgroundImage === 'none';
    const hasLine = bw > 0 && bc && bc.a > 0.01 && s.borderTopStyle !== 'none';
    // граница только с одной стороны (разделитель) — тонкой полосой
    if (!(bw > 0)) for (const [side, mk] of [['Bottom', (w) => [r.left, r.bottom - w, r.width, w]], ['Left', (w) => [r.left, r.top, w, r.height]], ['Right', (w) => [r.right - w, r.top, w, r.height]]]) {
      const sw = parseFloat(s['border' + side + 'Width']) || 0, sc = rgba(s['border' + side + 'Color']);
      if (sw > 0 && sc && sc.a > 0.01 && s['border' + side + 'Style'] !== 'none') { const [x, y, w, h] = mk(sw); out.shapes.push({ id: id(el) + side, x, y, w, h, radius: 0, fill: { hex: sc.hex, a: sc.a }, line: null }); }
    }
    if (!hasFill && !hasLine) { if (out.shapes.some((q) => q.id.startsWith(el.dataset.pptxId || '~'))) mark(el, 'shape'); continue; }
    if (el === root && hasFill && !hasLine) continue; // фон самого слайда — в картинку
    out.shapes.push({ id: id(el), x: r.left, y: r.top, w: r.width, h: r.height, radius: Math.min(parseFloat(s.borderTopLeftRadius) || 0, r.height / 2, r.width / 2),
      fill: hasFill ? bg : null, line: hasLine ? { hex: bc.hex, a: bc.a, w: bw } : null });
    mark(el, 'shape');
  }
  // текст: блок, в котором есть текст, а все дочерние элементы — строчные
  const isInlineOnly = (el) => Array.from(el.children).every((c) => /^inline/.test(getComputedStyle(c).display) && !c.matches('img,svg,i[class*="ri-"]'));
  for (const el of all) {
    if (!vis(el) || skipZone(el) || inPic(el) || el.closest('svg')) continue;
    const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own && !(el.children.length && isInlineOnly(el) && el.innerText.trim())) continue;
    if (!isInlineOnly(el)) {
      // смешанный блок (текст + блочные дети): берём только собственные текстовые узлы как отдельный абзац
      if (!own) continue;
    }
    if (el.parentElement && el.parentElement.closest('[data-pptx-k="text"]')) continue;
    const s = getComputedStyle(el), r = R(el);
    const runs = [];
    const walk = (node, inh) => {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) { if (n.textContent) runs.push({ t: n.textContent, el: n.parentElement }); }
        else if (n.nodeType === 1 && /^inline/.test(getComputedStyle(n).display) && !n.matches('img,svg,i[class*="ri-"]')) { if (n.tagName === 'BR') runs.push({ t: '\n', el: n }); else walk(n); }
      }
    };
    walk(el);
    const tt = (t, cs) => (cs.textTransform === 'uppercase' ? t.toUpperCase() : t);
    const rr = runs.map(({ t, el: e }) => { const cs = getComputedStyle(e); const c = rgba(cs.color);
      return { t: tt(t.replace(/\s+/g, (m) => (m.includes('\n') && t.trim() === '' ? ' ' : ' ')), cs), size: parseFloat(cs.fontSize), bold: +cs.fontWeight >= 600, color: c ? c.hex : '000000', alpha: c ? c.a : 1, ls: parseFloat(cs.letterSpacing) || 0 }; })
      .filter((x) => x.t !== '');
    if (!rr.length || !rr.map((x) => x.t).join('').trim()) continue;
    // точный прямоугольник текста (а не блока с отступами)
    // объединение прямоугольников только текстовых узлов: строчная картинка или иконка рядом не в счёт
    const rng = document.createRange(); let q = null;
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.textContent.trim() || n.parentElement.closest('svg,i[class*="ri-"]')) continue;
      rng.selectNodeContents(n); const b = rng.getBoundingClientRect(); if (!b.width) continue;
      q = q ? { left: Math.min(q.left, b.left), top: Math.min(q.top, b.top), right: Math.max(q.right, b.right), bottom: Math.max(q.bottom, b.bottom) } : { left: b.left, top: b.top, right: b.right, bottom: b.bottom };
    }
    if (!q) continue;
    q.width = q.right - q.left; q.height = q.bottom - q.top;
    const lh = s.lineHeight === 'normal' ? 1.2 : parseFloat(s.lineHeight) / parseFloat(s.fontSize);
    out.texts.push({ id: id(el), x: q.left, y: q.top, w: q.width, h: q.height, align: s.textAlign === 'center' ? 'center' : s.textAlign === 'right' || s.textAlign === 'end' ? 'right' : 'left', lh, runs: rr,
      nowrap: s.whiteSpace === 'nowrap' || q.height < parseFloat(s.fontSize) * lh * 1.5 });
    mark(el, 'text');
  }
  return out;
}

(async () => {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13,333 × 7,5″
  const browser = await launch({ executablePath: chrome, headless: true, args: ['--allow-file-access-from-files'] });
  const tmp = fs.mkdtempSync(path.join(path.dirname(path.resolve(outArg)), '.pptx-'));
  try {
    for (const file of srcArg.split('|')) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
      await page.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForSelector('body[data-ready="1"]', { timeout: 8000 }).catch(() => {});
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
      await new Promise((r) => setTimeout(r, 400));
      const g = await page.evaluate(collect);
      // картинки — по одной, на прозрачном фоне
      const picFiles = {};
      for (const p of g.pics) {
        await page.evaluate((pid) => {
          const st = document.createElement('style'); st.id = '__solo';
          st.textContent = 'html,body{background:transparent!important} body *{visibility:hidden!important} [data-pptx-id="' + pid + '"],[data-pptx-id="' + pid + '"] *{visibility:visible!important}';
          document.head.appendChild(st);
        }, p.id);
        const f = path.join(tmp, p.id + '.png');
        await page.screenshot({ path: f, omitBackground: true, clip: { x: p.x, y: p.y, width: p.w, height: p.h } });
        picFiles[p.id] = f;
        await page.evaluate(() => document.getElementById('__solo').remove());
      }
      // фон: всё, кроме перенесённого, — одной картинкой
      await page.addStyleTag({ content: '[data-pptx-k="text"],[data-pptx-k="text"] *{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}'
        + '[data-pptx-k="shape"]{background-color:transparent!important;border-color:transparent!important;box-shadow:none!important}'
        + '[data-pptx-k="pic"]{visibility:hidden!important}' });
      const bg = path.join(tmp, 'bg-' + path.basename(file) + '.png');
      await page.screenshot({ path: bg, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      await page.close();

      const slide = pptx.addSlide();
      slide.addImage({ path: bg, x: 0, y: 0, w: 13.333, h: 7.5 });
      for (const s of g.shapes) {
        const o = { x: s.x * PX, y: s.y * PX, w: s.w * PX, h: s.h * PX };
        if (s.fill) o.fill = { color: s.fill.hex, transparency: Math.round((1 - s.fill.a) * 100) }; else o.fill = { type: 'none' };
        o.line = s.line ? { color: s.line.hex, width: s.line.w * 0.5, transparency: Math.round((1 - s.line.a) * 100) } : { type: 'none' };
        if (s.radius > 0.5) { o.rectRadius = s.radius * PX; slide.addShape(pptx.ShapeType.roundRect, o); } else slide.addShape(pptx.ShapeType.rect, o);
      }
      for (const p of g.pics) slide.addImage({ path: picFiles[p.id], x: p.x * PX, y: p.y * PX, w: p.w * PX, h: p.h * PX });
      for (const t of g.texts) {
        const slack = t.nowrap ? 1.06 : 1.02; // запас: метрики Inter в PowerPoint чуть шире браузерных
        const w = t.w * slack, x = t.align === 'center' ? t.x - (w - t.w) / 2 : t.align === 'right' ? t.x - (w - t.w) : t.x;
        slide.addText(t.runs.map((r) => ({ text: r.t, options: { fontSize: r.size * 0.5, bold: r.bold, color: r.color, transparency: Math.round((1 - r.alpha) * 100), charSpacing: r.ls * 0.5 || undefined, breakLine: r.t === '\n' } })),
          { x: x * PX, y: t.y * PX, w: w * PX, h: Math.max(t.h, 4) * PX, fontFace: 'Inter', align: t.align, valign: 'top', margin: 0, lineSpacingMultiple: t.lh, fit: 'none', wrap: !t.nowrap, paraSpaceBefore: 0, paraSpaceAfter: 0 });
      }
      console.log('✓', path.basename(file), '— текстов', g.texts.length, '· фигур', g.shapes.length, '· картинок', g.pics.length);
    }
    await pptx.writeFile({ fileName: path.resolve(outArg) });
    console.log('→', outArg);
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
})();
