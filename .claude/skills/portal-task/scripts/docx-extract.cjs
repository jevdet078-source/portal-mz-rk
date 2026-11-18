// docx-extract.js — разбор постановки аналитика (.docx) без сторонних пакетов.
//
//   node docx-extract.js "<путь к .docx>" "<папка вывода>"
//
// Кладёт в папку вывода:
//   tz.md        — текст ТЗ по абзацам, таблицы — строками «ячейка | ячейка», списки — «•»,
//                  на месте каждой картинки — метка [РИС N: media/imageK.png], чтобы было видно,
//                  к какому пункту относится скриншот аналитика;
//   media/*      — все картинки из документа (скриншоты с отметками, референсы);
//   comments.md  — примечания рецензента Word, если они есть (часто там главные замечания).
// В консоль — сводка: сколько абзацев, таблиц, картинок, примечаний.
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

let [src, outDir] = process.argv.slice(2);
if (!src || !outDir) { console.error('usage: node docx-extract.js <file.docx> <outDir>'); process.exit(1); }
// Имя файла с похожими, но другими символами (латинская «а», NFD, лишний пробел) — ищем в той же папке
if (!fs.existsSync(src)) {
  const key = (s) => s.normalize('NFKC').toLowerCase().replace(/[^0-9a-zа-яёәғқңөұүһі]/g, '')
    .replace(/[aeopcxyk]/g, (c) => ({ a: 'а', e: 'е', o: 'о', p: 'р', c: 'с', x: 'х', y: 'у', k: 'к' })[c]);
  const dir = path.dirname(src), want = key(path.basename(src));
  const hit = fs.existsSync(dir) && fs.readdirSync(dir).find((f) => key(f) === want);
  if (!hit) { console.error('файл не найден: ' + src); process.exit(1); }
  src = path.join(dir, hit);
}
const buf = fs.readFileSync(src);

// ── Мини-читатель ZIP (центральный каталог) ──────────────────────────────
function unzip(b) {
  let eocd = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 65557); i--) if (b.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('не ZIP / не .docx');
  const n = b.readUInt16LE(eocd + 10); let p = b.readUInt32LE(eocd + 16);
  const files = {};
  for (let k = 0; k < n; k++) {
    const method = b.readUInt16LE(p + 10), csize = b.readUInt32LE(p + 20);
    const nl = b.readUInt16LE(p + 28), el = b.readUInt16LE(p + 30), cl = b.readUInt16LE(p + 32);
    const off = b.readUInt32LE(p + 42); const name = b.slice(p + 46, p + 46 + nl).toString('utf8');
    const lnl = b.readUInt16LE(off + 26), lel = b.readUInt16LE(off + 28);
    const data = b.slice(off + 30 + lnl + lel, off + 30 + lnl + lel + csize);
    files[name] = method === 0 ? data : method === 8 ? zlib.inflateRawSync(data) : null;
    p += 46 + nl + el + cl;
  }
  return files;
}
const z = unzip(buf);
const xml = (n) => (z[n] ? z[n].toString('utf8') : '');
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

// Связи rId → файл картинки
const rels = {};
xml('word/_rels/document.xml.rels').replace(/<Relationship\b[^>]*>/g, (r) => {
  const id = (r.match(/Id="([^"]+)"/) || [])[1], t = (r.match(/Target="([^"]+)"/) || [])[1];
  if (id && t) rels[id] = t.replace(/^\/?word\//, '');
});

let pic = 0;
const picOrder = [];
function runsText(p) {
  let s = '';
  p.replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>|<w:tab\/>|<w:br\/>|r:embed="([^"]+)"|<v:imagedata[^>]*r:id="([^"]+)"/g, (m, t, e1, e2) => {
    if (t !== undefined) s += dec(t);
    else if (m === '<w:tab/>') s += '\t';
    else if (m === '<w:br/>') s += '\n';
    else { const f = rels[e1 || e2]; if (f) { pic++; picOrder.push(f); s += ` [РИС ${pic}: ${f}] `; } }
    return m;
  });
  return s.replace(/[  ]+/g, ' ').trim();
}
function para(p) {
  const t = runsText(p); if (!t) return '';
  const st = (p.match(/<w:pStyle w:val="([^"]+)"/) || [])[1] || '';
  const lvl = (p.match(/<w:ilvl w:val="(\d+)"/) || [])[1];
  if (/^(Heading|Заголовок|Title)\s*(\d)?/i.test(st) || /^\d$/.test(st)) { const h = (st.match(/\d/) || ['2'])[0]; return '#'.repeat(Math.min(+h + 1, 4)) + ' ' + t; }
  if (/<w:numPr>/.test(p)) return '  '.repeat(+(lvl || 0)) + '• ' + t;
  return t;
}
const body = (xml('word/document.xml').match(/<w:body>([\s\S]*)<\/w:body>/) || [, ''])[1];
const out = []; let paras = 0, tables = 0;
// Верхний уровень тела: абзацы и таблицы по порядку
const re = /<w:tbl>[\s\S]*?<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>|<w:p\/>/g;
let m;
while ((m = re.exec(body))) {
  const chunk = m[0];
  if (chunk.startsWith('<w:tbl>')) {
    tables++; out.push('', `[ТАБЛИЦА ${tables}]`);
    // вложенные таблицы встречаются редко — берём строки грубо
    (chunk.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g) || []).forEach((tr) => {
      const cells = (tr.match(/<w:tc>[\s\S]*?<\/w:tc>/g) || []).map((tc) => (tc.match(/<w:p[ >][\s\S]*?<\/w:p>/g) || []).map(runsText).filter(Boolean).join(' / '));
      out.push('| ' + cells.join(' | ') + ' |');
    });
    out.push('');
  } else { const t = para(chunk); if (t) { out.push(t); paras++; } }
}
fs.mkdirSync(path.join(outDir, 'media'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'tz.md'), out.join('\n'), 'utf8');
let media = 0;
for (const n of Object.keys(z)) if (n.startsWith('word/media/') && z[n]) { fs.writeFileSync(path.join(outDir, 'media', path.basename(n)), z[n]); media++; }
const com = xml('word/comments.xml');
let comments = 0;
if (com) {
  const list = (com.match(/<w:comment\b[\s\S]*?<\/w:comment>/g) || []).map((c) => { comments++; const a = (c.match(/w:author="([^"]*)"/) || [])[1] || ''; return `• ${dec(a)}: ` + (c.match(/<w:p[ >][\s\S]*?<\/w:p>/g) || []).map(runsText).join(' '); });
  fs.writeFileSync(path.join(outDir, 'comments.md'), list.join('\n'), 'utf8');
}
console.log(`абзацев ${paras}, таблиц ${tables}, картинок в тексте ${pic} (файлов media ${media}), примечаний ${comments}`);
console.log('порядок картинок: ' + picOrder.map((f, i) => `${i + 1}=${path.basename(f)}`).join(', '));
