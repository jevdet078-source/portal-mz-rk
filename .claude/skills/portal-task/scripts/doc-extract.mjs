// doc-extract.mjs — разбор постановки из Confluence («.doc», на самом деле MHTML) без сторонних пакетов.
//
//   node doc-extract.mjs "<путь к .doc>" "<папка вывода>"
//
// Кладёт в папку вывода:
//   tz.md     — текст по абзацам; заголовки — «#», таблицы — строками «ячейка | ячейка», списки — «•»;
//               на месте картинки — метка [РИС N: media/<файл>], чтобы было видно, к какому пункту она относится
//   media/    — все картинки документа
// Если файл не MHTML (настоящий бинарный Word 97), скрипт так и скажет — тогда открыть через Word COM
// или попросить у пользователя .docx.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const [, , src, out] = process.argv;
if (!src || !out) { console.error('node doc-extract.mjs "<файл .doc>" "<папка вывода>"'); process.exit(1); }
const raw = readFileSync(src, 'latin1');
const bm = raw.match(/boundary="([^"]+)"/);
if (!/MIME-Version/i.test(raw.slice(0, 2000)) || !bm) {
  console.error('Это не MHTML-экспорт Confluence. Нужен .docx или разбор через Word.');
  process.exit(2);
}
mkdirSync(join(out, 'media'), { recursive: true });

const parts = raw.split('--' + bm[1]).slice(1, -1);
const qp = (s) => {
  const bytes = [];
  const t = s.replace(/=\r?\n/g, '');
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '=' && /^[0-9A-F]{2}$/i.test(t.slice(i + 1, i + 3))) { bytes.push(parseInt(t.slice(i + 1, i + 3), 16)); i += 2; }
    else bytes.push(t.charCodeAt(i) & 0xff);
  }
  return Buffer.from(bytes).toString('utf8');
};

let html = '';
const images = new Map(); // Content-Location → локальное имя
let n = 0;
for (const p of parts) {
  const sep = p.search(/\r?\n\r?\n/);
  const head = p.slice(0, sep);
  const body = p.slice(sep).trim();
  const type = (head.match(/Content-Type:\s*([^;\s]+)/i) || [])[1] || '';
  const enc = (head.match(/Content-Transfer-Encoding:\s*(\S+)/i) || [])[1] || '';
  const loc = (head.match(/Content-Location:\s*(\S+)/i) || [])[1] || '';
  if (/text\/html/i.test(type)) { html += /quoted/i.test(enc) ? qp(body) : Buffer.from(body, 'latin1').toString('utf8'); continue; }
  if (/base64/i.test(enc) && loc) {
    n++;
    const buf = Buffer.from(body.replace(/\s+/g, ''), 'base64');
    let ext = (loc.match(/\.(png|jpe?g|gif|svg|webp|bmp)(\?|$)/i) || [])[1];
    if (!ext) {
      const h = buf.subarray(0, 12).toString('latin1');
      ext = h.startsWith('\x89PNG') ? 'png' : h.startsWith('\xFF\xD8') ? 'jpg' : h.startsWith('GIF8') ? 'gif'
        : h.slice(8, 12) === 'WEBP' ? 'webp' : /<svg|<\?xml/.test(buf.subarray(0, 200).toString('utf8')) ? 'svg' : 'bin';
    }
    const name = 'image' + n + '.' + ext.toLowerCase();
    writeFileSync(join(out, 'media', name), buf);
    images.set(loc, name);
    images.set(basename(loc.split('?')[0]), name);
  }
}

const ent = (s) => s.replace(/&nbsp;/g, ' ').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&mdash;/g, '—')
  .replace(/&ndash;/g, '–').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
let fig = 0;
let t = html
  .replace(/<head[\s\S]*?<\/head>/i, '')
  .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
  .replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (m, s) => {
    const key = s.split('?')[0];
    let name = images.get(s) || images.get(key);
    // в разметке путь относительный (/download/attachments/…), а у части — полный URL Confluence
    if (!name) for (const [loc, nm] of images) if (loc.split('?')[0].endsWith(key)) { name = nm; break; }
    // запасной вариант — по порядку появления
    if (!name) name = [...new Set(images.values())][fig];
    fig++;
    return '\n[РИС ' + fig + ': ' + (name ? 'media/' + name : 'нет файла — ' + s.slice(0, 60)) + ']\n';
  })
  // ячейка таблицы — одной строкой: абзацы и переносы внутри неё склеиваем через « / »
  .replace(/<(td|th)([^>]*)>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, inner) => '<' + tag + '>' + inner
    .replace(/<br\s*\/?>|<\/p>|<\/li>|<\/div>/gi, ' / ').replace(/<li[^>]*>/gi, '• ').replace(/<(?!\/?(td|th)\b)[^>]+>/gi, ' ')
    .replace(/\s+/g, ' ').replace(/(\s*\/\s*)+$/, '').replace(/^(\s*\/\s*)+/, '').trim() + '</' + tag + '>')
  .replace(/<tr([^>]*)>([\s\S]*?)<\/tr>/gi, (m, a, inner) => '<tr>' + inner.replace(/\s*\n\s*/g, ' ') + '</tr>')
  .replace(/<h([1-6])[^>]*>/gi, (m, l) => '\n' + '#'.repeat(+l) + ' ')
  .replace(/<\/h[1-6]>/gi, '\n')
  .replace(/<li[^>]*>/gi, '\n• ')
  .replace(/<\/(td|th)>/gi, ' | ')
  .replace(/<tr[^>]*>/gi, '\n| ')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(p|div|tr|table|ul|ol)>/gi, '\n')
  .replace(/<[^>]+>/g, '');
t = ent(t).split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter((l, i, a) => l || (a[i - 1] && a[i - 1].trim())).join('\n');
writeFileSync(join(out, 'tz.md'), '# ' + basename(src) + '\n\n' + t + '\n');
console.log('tz.md: ' + t.length + ' символов, картинок: ' + n + ', меток в тексте: ' + fig + ' → ' + out);
