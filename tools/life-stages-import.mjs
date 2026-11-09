/**
 * Импорт постановки «Здоровье на каждом этапе жизни» (выгрузка Confluence → Word / .doc, это MHTML)
 * в данные раздела: project/LifeStagesData.dc.html (window.mpStages).
 *
 *   node tools/life-stages-import.mjs "<путь к .doc>"
 *
 * Аналитик дополняет тексты подразделов в Confluence → выгружает заново → запускаем импорт.
 * Структура раздела (направления, иконки, порядок, описания карточек) задана здесь, в META;
 * тексты подразделов берутся из таблиц «Подраздел | Что должно отображаться» как есть.
 *
 * Разбор текста ячейки:
 *   • короткая строка без точки в конце            → подзаголовок (попадает в оглавление)
 *   • строка, оканчивающаяся двоеточием, перед списком → подпись списка
 *   • строки «- …» / «• …» и списки Word           → маркированный список
 *   • строки с колонками через двойной пробел       → таблица (первая строка — шапка)
 *   • «Важно!!!» + следующий абзац                  → предупреждение
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC) { console.error('Укажите путь к выгрузке .doc'); process.exit(1); }
const OUT = path.resolve(import.meta.dirname, '..', 'project', 'LifeStagesData.dc.html');

// ——— MHTML → HTML ———
function mhtmlHtml(file) {
  const raw = fs.readFileSync(file).toString('latin1');
  const m = raw.match(/boundary="?([^"\r\n;]+)"?/i);
  if (!m) return fs.readFileSync(file, 'utf8');
  for (const part of raw.split('--' + m[1]).slice(1)) {
    const i = part.search(/\r?\n\r?\n/); if (i < 0) continue;
    const head = part.slice(0, i), body = part.slice(i).replace(/^\r?\n\r?\n/, '');
    if (!/Content-Type:\s*text\/html/i.test(head)) continue;
    if (/quoted-printable/i.test(head)) {
      const s = body.replace(/=\r?\n/g, ''); const b = [];
      for (let k = 0; k < s.length; k++) {
        if (s[k] === '=' && /^[0-9A-F]{2}$/i.test(s.substr(k + 1, 2))) { b.push(parseInt(s.substr(k + 1, 2), 16)); k += 2; }
        else b.push(s.charCodeAt(k) & 0xff);
      }
      return Buffer.from(b).toString('utf8');
    }
    if (/base64/i.test(head)) return Buffer.from(body.replace(/\s+/g, ''), 'base64').toString('utf8');
    return Buffer.from(body, 'latin1').toString('utf8');
  }
  throw new Error('В файле нет HTML-части');
}

// ——— мини-DOM ———
const VOID = new Set(['br', 'col', 'img', 'meta', 'hr', 'link', 'input']);
function parse(html) {
  const root = { tag: '#root', kids: [] }; const stack = [root];
  const re = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g; let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    if (m[4] != null) { stack[stack.length - 1].kids.push({ text: m[4] }); continue; }
    const tag = m[2].toLowerCase();
    if (m[1]) { for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === tag) { stack.length = i; break; } continue; }
    const node = { tag, attrs: m[3], kids: [] };
    stack[stack.length - 1].kids.push(node);
    if (!VOID.has(tag) && !/\/\s*$/.test(m[3])) stack.push(node);
  }
  return root;
}
const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…' };
const dec = (t) => t.replace(/&(#x?[0-9a-f]+|\w+);/gi, (_, e) => e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1)) : (ENT[e] ?? '&' + e + ';'));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// текст узла; <br> → \n, <strong> → маркеры
function text(n) {
  if (n.text != null) return dec(n.text).replace(/[ \t\r\n]+/g, (s) => s.includes(' ') ? s : ' ');
  if (n.tag === 'br') return '\n';
  if (n.tag === 'ul' || n.tag === 'ol') return '';
  const t = n.kids.map(text).join('');
  return n.tag === 'strong' || n.tag === 'b' ? '\u0001' + t + '\u0002' : t;
}
// типографика: дефис между словами → тире
const clean = (s) => s.replace(/ /g, ' ').replace(/[ 	]+/g, ' ').trim().replace(/ - /g, ' — ');
const inl = (s) => esc(clean(s)).replace(/\u0001(.*?)\u0002/g, '<b>$1</b>').replace(/[\u0001\u0002]/g, '');

// ячейка → поток строк и списков
function flow(node, out = []) {
  for (const k of node.kids) {
    if (k.text != null) { const t = clean(text(k)); if (t) out.push({ t: 'line', s: text(k) }); continue; }
    if (k.tag === 'ul' || k.tag === 'ol') { out.push({ t: 'list', ord: k.tag === 'ol', items: listItems(k) }); continue; }
    if (k.tag === 'p' || k.tag === 'h1' || k.tag === 'h2' || k.tag === 'h3' || k.tag === 'h4') {
      text(k).split('\n').forEach(s => { if (clean(s)) out.push({ t: 'line', s }); });
      const nested = k.kids.filter(x => x.tag === 'ul' || x.tag === 'ol'); nested.forEach(x => out.push({ t: 'list', ord: x.tag === 'ol', items: listItems(x) }));
      continue;
    }
    flow(k, out);
  }
  return out;
}
function listItems(ul) {
  return ul.kids.filter(k => k.tag === 'li').map(li => {
    const sub = []; const walk = (n) => n.kids.forEach(c => { if (c.tag === 'ul' || c.tag === 'ol') sub.push(...listItems(c)); else if (c.kids) walk(c); });
    walk(li);
    return { s: text(li).split('\n').map(clean).filter(Boolean).join(' '), sub };
  }).filter(x => clean(x.s) || x.sub.length);
}

const COLS = / \s* |\s{3,}|  |  /;
const isHeading = (s) => { const c = clean(s).replace(/[\u0001\u0002]/g, ''); return c.length <= 80 && !/[.;!?…,:»)]$/.test(c) && !/^[-•]/.test(c) && !COLS.test(s.trim()) && /^[0-9А-ЯЁA-Z«]/.test(c); };
const isLabel = (s) => { const c = clean(s); return c.length <= 110 && /:$/.test(c); };

let hid = 0;
const DASHROW = /^([^.]{1,30}?) [-—] (.+)$/;
function blocksOf(cell) {
  const f = flow(cell); const B = []; let warn = false;
  // строки «Возраст - Особенности» подряд (от трёх) — таблица из двух колонок
  for (let i = 0; i < f.length; i++) {
    let j = i; while (j < f.length && f[j].t === 'line' && DASHROW.test(clean(f[j].s))) j++;
    if (j - i >= 3) for (let k = i; k < j; k++) { const m = clean(f[k].s).match(DASHROW); f[k] = { t: 'row', cells: [m[1], m[2]] }; }
    if (j > i) i = j - 1;
  }
  for (let i = 0; i < f.length; i++) {
    const x = f[i];
    if (x.t === 'list') { B.push({ k: 'list', ord: x.ord, items: x.items }); continue; }
    if (x.t === 'row') { const last = B[B.length - 1]; if (last && last.k === 'table') last.rows.push(x.cells); else B.push({ k: 'table', rows: [x.cells] }); continue; }
    const raw = x.s, c = clean(raw);
    if (/^важно!*$/i.test(c.replace(/[\u0001\u0002]/g, ''))) { warn = true; continue; }
    if (warn) { B.push({ k: 'alert', s: raw }); warn = false; continue; }
    if (/^[-•]\s?/.test(c)) { const last = B[B.length - 1]; const item = { s: c.replace(/^[-•]\s?/, ''), sub: [] }; if (last && last.k === 'list' && last.dash) last.items.push(item); else B.push({ k: 'list', dash: true, items: [item] }); continue; }
    if (COLS.test(raw.trim()) && raw.trim().split(COLS).filter(Boolean).length >= 2) {
      const cells = raw.trim().split(COLS).map(clean).filter(Boolean);
      const last = B[B.length - 1]; if (last && last.k === 'table') last.rows.push(cells); else B.push({ k: 'table', rows: [cells] }); continue;
    }
    // «Возраст - Основные особенности» перед строками таблицы
    if (isLabel(raw) && f[i + 1] && (f[i + 1].t === 'list' || /^[-•]/.test(clean(f[i + 1].s || '')))) { B.push({ k: 'label', s: raw }); continue; }
    if (isHeading(raw)) { B.push({ k: 'h', s: raw }); continue; }
    if (isLabel(raw)) { B.push({ k: 'label', s: raw }); continue; }
    B.push({ k: 'p', s: raw });
  }
  // подзаголовков нет, а подписей списков две и больше — подписи становятся пунктами оглавления
  if (!B.some(b => b.k === 'h') && B.filter(b => b.k === 'label').length >= 2) B.forEach(b => { if (b.k === 'label') { b.k = 'h'; b.s = clean(b.s).replace(/:$/, ''); } });
  // строка перед таблицей с одной колонкой — это шапка таблицы
  return B;
}
function render(B) {
  const toc = []; let html = ''; let seenH = false;
  const li = (items, ord) => '<' + (ord ? 'ol' : 'ul') + '>' + items.map(it => '<li>' + inl(it.s) + (it.sub && it.sub.length ? li(it.sub, false) : '') + '</li>').join('') + '</' + (ord ? 'ol' : 'ul') + '>';
  B.forEach((b, i) => {
    if (b.k === 'h') { const id = 'h' + (++hid); seenH = true; toc.push({ id, label: clean(b.s).replace(/[\u0001\u0002]/g, '').replace(/^\d+\.\s*/, (m) => m) }); html += '<h2 id="' + id + '">' + inl(b.s) + '</h2>'; return; }
    if (b.k === 'p') { html += '<p' + (!seenH && i < 2 && B.slice(0, i).every(x => x.k === 'p') ? ' class="lead"' : '') + '>' + inl(b.s) + '</p>'; return; }
    if (b.k === 'label') { html += '<p class="lbl">' + inl(b.s) + '</p>'; return; }
    if (b.k === 'list') { html += li(b.items, b.ord); return; }
    // при упоминании скорой — кнопка вызова 103 прямо в предупреждении
    if (b.k === 'alert') { const sos = /скор/i.test(b.s) ? '<a class="sos" href="tel:103"><i class="ri-phone-fill" aria-hidden="true"></i>Скорая помощь — 103</a>' : ''; html += '<div class="alert" role="note"><i class="ri-error-warning-fill" aria-hidden="true"></i><div><b>Важно</b><p>' + inl(b.s) + '</p>' + sos + '</div></div>'; return; }
    if (b.k === 'table') {
      const [hd, ...rows] = b.rows; const n = Math.max(...b.rows.map(r => r.length));
      html += '<div class="tbl"><table><thead><tr>' + Array.from({ length: n }, (_, k) => '<th>' + esc(hd[k] || '') + '</th>').join('') + '</tr></thead><tbody>'
        + rows.map(r => '<tr>' + Array.from({ length: n }, (_, k) => '<td>' + esc(r[k] || '') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
    }
  });
  return { html, toc };
}

// ——— структура раздела (порядок, иконки, карточки) ———
const META = [
  { id: 'newborn', match: 'Здоровье новорождённого', title: 'Здоровье новорождённого', aud: '0–28 дней', art: 'babybottle', tone: 'teal',
    desc: 'Первые дни, патронаж, кормление, уход и безопасный сон' },
  { id: 'growth', match: 'Рост и развитие ребёнка', title: 'Рост и развитие ребёнка', aud: '1 месяц – 17 лет', art: 'blocks', tone: 'yellow',
    desc: 'Развитие, питание, сон, зрение и профилактические осмотры' },
  { id: 'reproductive', match: 'Репродуктивное здоровье и планирование семьи', title: 'Репродуктивное здоровье и планирование семьи', aud: 'Подростки и взрослые', art: 'hearts', tone: 'pink',
    desc: 'Здоровье женщин и мужчин, планирование семьи, контрацепция' },
  { id: 'pregnancy', match: 'Беременность, роды и послеродовой период', title: 'Беременность, роды и послеродовой период', aud: 'Беременность и после родов', art: 'stroller', tone: 'purple',
    desc: 'Учёт, триместры, подготовка к родам и восстановление' },
  { id: 'chronic', match: 'Хронические заболевания', title: 'Хронические заболевания и ПУЗ', full: 'Хронические заболевания и программа управления заболеваниями (ПУЗ)', aud: 'Пациенты с хроническими заболеваниями', art: 'tonometer', tone: 'brand',
    desc: 'Для пациентов с хроническими заболеваниями и факторами риска' },
  { id: 'longevity', match: 'Здоровое долголетие', title: 'Здоровое долголетие', aud: 'Взрослые и пожилые люди', art: 'plant', tone: 'green',
    desc: 'Питание, активность, профилактика падений и когнитивное здоровье' },
];
// иконки подразделов (RemixIcon, без префикса ri- нельзя: здесь классы целиком)
const ICONS = [
  [/первые дни/i, 'ri-sun-line'], [/патронаж/i, 'ri-home-heart-line'], [/грудное вскармливание/i, 'ri-hand-heart-line'], [/гигиена/i, 'ri-drop-line'],
  [/безопасный сон|сон и режим/i, 'ri-moon-clear-line'], [/нервно-психическое развитие$/i, 'ri-brain-line'], [/физическое и нервно/i, 'ri-line-chart-line'],
  [/когда .*обратиться/i, 'ri-alarm-warning-line'], [/физическое развитие/i, 'ri-ruler-line'], [/речевое/i, 'ri-chat-smile-2-line'],
  [/социальное и эмоциональное/i, 'ri-emotion-happy-line'], [/питание ребёнка/i, 'ri-restaurant-2-line'], [/полости рта/i, 'ri-tooth-line'],
  [/зрение, слух и осанка/i, 'ri-eye-line'], [/профилактические медицинские осмотры/i, 'ri-stethoscope-line'],
  [/здоровье женщин/i, 'ri-women-line'], [/здоровье мужчин/i, 'ri-men-line'], [/половое созревание/i, 'ri-user-heart-line'],
  [/планирование семьи/i, 'ri-parent-line'], [/контрацепция/i, 'ri-shield-check-line'], [/прегравидарная/i, 'ri-calendar-check-line'],
  [/психологическое благополучие/i, 'ri-mental-health-line'], [/инфекции/i, 'ri-virus-line'],
  [/подтверждение беременности/i, 'ri-checkbox-circle-line'], [/постановка на учёт/i, 'ri-file-user-line'], [/первый триместр/i, 'ri-number-1'],
  [/второй триместр/i, 'ri-number-2'], [/третий триместр/i, 'ri-number-3'], [/медицинское наблюдение/i, 'ri-stethoscope-line'],
  [/питание и образ жизни/i, 'ri-leaf-line'], [/подготовка к родам/i, 'ri-book-open-line'], [/^роды$/i, 'ri-hospital-line'],
  [/послеродовое восстановление/i, 'ri-heart-add-line'], [/послеродовая контрацепция/i, 'ri-shield-check-line'],
  [/динамическое наблюдение/i, 'ri-calendar-schedule-line'], [/хронических заболеваний/i, 'ri-pulse-line'], [/что такое пуз/i, 'ri-stack-line'], [/кому доступна/i, 'ri-group-line'],
  [/гипертензия/i, 'ri-heart-pulse-line'], [/диабет/i, 'ri-drop-line'], [/сердечная недостаточность/i, 'ri-heart-3-line'],
  [/самоконтроль/i, 'ri-todo-line'], [/сегментация/i, 'ri-pie-chart-2-line'], [/осложнений/i, 'ri-shield-cross-line'],
  [/здоровое старение/i, 'ri-seedling-line'], [/рациональное питание/i, 'ri-restaurant-2-line'], [/физическая активность/i, 'ri-run-line'],
  [/падений/i, 'ri-walk-line'], [/когнитивное/i, 'ri-brain-line'], [/зрение и слух/i, 'ri-eye-line'], [/лекарственная безопасность/i, 'ri-capsule-line'],
  [/гериатрическая/i, 'ri-hand-heart-line'], [/социальная активность/i, 'ri-team-line'],
];
const icon = (t) => (ICONS.find(([re]) => re.test(t)) || [, 'ri-file-text-line'])[1];
const slug = (t) => t.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/g, '-').replace(/^-|-$/g, '')
  .replace(/[а-я]/g, (ch) => ({ а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' })[ch]).slice(0, 48);

// ——— разбор документа ———
const doc = parse(mhtmlHtml(SRC));
const body = (function find(n) { if (n.tag === 'body') return n; for (const k of n.kids || []) { const r = find(k); if (r) return r; } })(doc);
const top = []; (function flat(n) { for (const k of n.kids) { if (k.tag === 'div' && /Section1/.test(k.attrs || '')) flat(k); else if (k.tag === 'ol' && k.kids.some(x => x.tag === 'li' && x.kids.some(y => y.tag === 'h3'))) { k.kids.forEach(li => li.kids && li.kids.forEach(y => top.push(y))); } else top.push(k); } })(body);

const sections = META.map(m => ({ ...m, subs: [] }));
let cur = null;
for (const n of top) {
  if (n.tag === 'h3') { const t = clean(text(n)); cur = sections.find(s => t.includes(s.match)) || null; continue; }
  if (!cur || !n.kids) continue;
  const tables = []; (function f(x) { if (x.tag === 'table') tables.push(x); else (x.kids || []).forEach(f); })(n);
  for (const tb of tables) {
    const rows = []; (function f(x) { if (x.tag === 'tr') rows.push(x); else (x.kids || []).forEach(f); })(tb);
    for (const tr of rows) {
      const cells = tr.kids.filter(c => c.tag === 'td');
      if (cur.id === 'chronic') {
        // ПУЗ: «№ | Подраздел | Содержание информационной страницы» — тексты придут от специалистов
        if (cells.length === 3 && /^\d+$/.test(clean(text(cells[0])))) {
          const title = clean(text(cells[1])), plan = clean(text(cells[2]));
          cur.subs.push({ id: slug(title), title, icon: icon(title), plan, html: '', toc: [] });
        }
        continue;
      }
      if (cells.length !== 2) continue;
      const names = flow(cells[0]).filter(x => x.t === 'line').map(x => clean(x.s)).filter(Boolean);
      const title = names[0]; if (!title || /^подраздел$/i.test(title)) continue;
      const { html, toc } = render(blocksOf(cells[1]));
      cur.subs.push({ id: slug(title), title, meta: names.slice(1).join(' · '), icon: icon(title), html, toc });
    }
  }
}
// «Что такое ПУЗ» — блоки по постановке (п. 5.2), текст в работе у специалистов
const puz = sections.find(s => s.id === 'chronic');
puz.subs.forEach(s => { if (/что такое пуз/i.test(s.title)) s.blocks = ['О программе', 'Задачи программы', 'Совместная работа пациента и медицинской команды']; });

// ——— запись ———
const stats = sections.map(s => `${s.title}: ${s.subs.length}`).join('\n  ');
const data = JSON.stringify(sections.map(({ match, ...s }) => s));
const out = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="./support.js"></script>
</head>
<body>
<!--
  Данные раздела «Здоровье на каждом этапе жизни» — невизуальный компонент (как HomeData).
  <dc-import name="LifeStagesData" hint-size="0px,0px"> кладёт window.mpStages и рассылает 'mp-stages-ready'.

  ФАЙЛ СГЕНЕРИРОВАН: node tools/life-stages-import.mjs "<выгрузка постановки .doc>"
  Руками не править — тексты меняются в постановке (Confluence), затем импорт заново.
  Направлений: ${sections.length}
  ${stats}
-->
<x-dc><div hidden></div></x-dc>
<script type="text/x-dc" data-dc-script data-props="{&quot;$preview&quot;:{&quot;width&quot;:10,&quot;height&quot;:10}}">
const SECTIONS = ${data};
if(!window.mpStages){
  window.mpStages = {
    SECTIONS,
    get: (id) => SECTIONS.find(s => s.id === id) || null,
    sub: (sid, pid) => { const s = SECTIONS.find(x => x.id === sid); return s ? (s.subs.find(p => p.id === pid) || null) : null; },
  };
}
class Component extends DCLogic {
  componentDidMount(){ try { window.dispatchEvent(new CustomEvent('mp-stages-ready')); } catch(e){} }
  renderVals(){ return {}; }
}
</script>
</body>
</html>
`;
fs.writeFileSync(OUT, out);
console.log('Готово:', path.relative(process.cwd(), OUT), (out.length / 1024).toFixed(0) + ' КБ\n  ' + stats);
