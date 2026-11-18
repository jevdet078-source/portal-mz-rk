// ux-audit.js — автопроверка открытой страницы портала МЗ РК (.dc.html) на типовые дефекты вёрстки.
// Основа — аудит ЕГМИС; добавлены проверки по замечаниям аналитиков портала (insetStroke, dupText,
// proseHint, noHover, lowContrast) и поиск окон без role="dialog".
//
// Как запускать (страница открыта через node tools/serve.mjs, сервер отдаёт корень репо):
//   (0, eval)(await (await fetch('/.claude/skills/portal-ux/scripts/ux-audit.js', {cache:'no-store'})).text())
// в mcp__Claude_Browser__javascript_tool — последним выражением возвращается JSON-отчёт.
// Прогонять на каждом проверяемом состоянии (страница, открытое окно, раскрытый блок, пустое
// состояние, ошибка) и на размерах 1440×900, 1366×768, 1920×1080, 2560×1440.
// Элемент можно исключить из проверки атрибутом data-audit-skip (панель «Прототип» исключена сама).
//
// Что ищет (ключи отчёта):
//   insetStroke   — обводка плашки сделана box-shadow inset, а фон детей доходит до края (дефект В5);
//   dupText       — одно и то же значение показано на странице несколько раз (дефект А3, эвристика);
//   proseHint     — абзац мелкого серого пояснительного текста (дефект А2, эвристика);
//   noHover       — кликабельный элемент без правила :hover (эвристика: ховер на JS не виден);
//   lowContrast   — контраст текста ниже 4.5:1 (крупный текст — ниже 3:1);
// Что ищет (ключи отчёта):
//   textSpill     — текст не помещается в свой блок и вылезает (бейдж, кнопка, ячейка, сегмент);
//   cellOverflow  — содержимое ячейки таблицы заходит в соседнюю колонку;
//   edgePad       — содержимое первой / последней колонки прилипло к краю таблицы (меньше 12 px);
//   boxOverflow   — элемент выходит за рамку своей карточки / блока (кнопка печати за краем карточки);
//   clipped       — поле, кнопка или бейдж обрезаны предком с overflow: hidden (срезанная рамка поля);
//   modalScroll   — в модальном окне есть вертикальная или горизонтальная прокрутка;
//   modalHead     — в шапке окна иконка и заголовок не на одной линии по центру (дефект 21а);
//   modalEmpty    — в окне справа пустая полоса: содержимое не доходит до правого края (окно шире содержимого, дефект 21б);
//   hScroll       — горизонтальная прокрутка у блока вне таблиц (и у страницы целиком);
//   tableGap      — пустое место между последней строкой таблицы и её подвалом;
//   misaligned    — поля одного ряда стоят на разной высоте (смещение 2–12 px);
//   gutters       — у раздела ограничена ширина (maxWidth) и по бокам пустые поля на широком экране;
//   nativeUi      — нативный <select> / системный календарь вместо компонентов дизайн-системы;
//   latin         — латиница в видимом тексте (проверить: английские слова в интерфейсе недопустимы);
//   emoji         — эмодзи в интерфейсе.
// Каждый дефект — { where, text, detail }. where — короткий путь до элемента для поиска в коде.
(() => {
  const MAX = 15;
  const out = {};
  const add = (k, el, detail) => {
    (out[k] = out[k] || []);
    if (out[k].length >= MAX) { out[k].more = (out[k].more || 0) + 1; return; }
    out[k].push({ where: pathOf(el), text: txt(el).slice(0, 60), detail });
  };
  const txt = (el) => (el && el.innerText ? el.innerText.replace(/\s+/g, ' ').trim() : '');
  const vis = (el) => {
    if (!el || !el.getClientRects().length) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.01;
  };
  const pathOf = (el) => {
    const parts = [];
    for (let e = el, i = 0; e && e !== document.body && i < 4; e = e.parentElement, i++) {
      let p = e.tagName.toLowerCase();
      if (e.id) { p += '#' + e.id; parts.unshift(p); break; }
      const c = (typeof e.className === 'string' ? e.className : '').split(/\s+/).filter((x) => x && !/^(text-|ri-)/.test(x))[0];
      if (c) p += '.' + c;
      parts.unshift(p);
    }
    return parts.join(' > ');
  };
  const R = (el) => el.getBoundingClientRect();
  const SKIP = 'script,style,svg,canvas,[data-audit-skip],.pp';
  const all = Array.from(document.body.querySelectorAll('*')).filter((el) => !el.closest(SKIP));
  const visible = all.filter(vis);

  // 1. Текст вылезает из своего блока: меряем сами текстовые узлы, а не scrollWidth —
  // абсолютно спозиционированные значки (стрелка сортировки у заголовка) дефектом не считаются
  const rng = document.createRange();
  for (const el of visible) {
    const s = getComputedStyle(el);
    if (s.textOverflow === 'ellipsis' || s.display === 'inline' || el.clientWidth === 0) continue;
    const nodes = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent.trim());
    if (!nodes.length) continue;
    const r = R(el), padR = parseFloat(s.paddingRight) || 0, padL = parseFloat(s.paddingLeft) || 0, bw = parseFloat(s.borderRightWidth) || 0;
    let over = 0;
    for (const n of nodes) { rng.selectNodeContents(n); const q = rng.getBoundingClientRect(); over = Math.max(over, q.right - (r.right - bw), (r.left + bw) - q.left); }
    if (over > 1) add('textSpill', el, `текст выходит за край на ${Math.round(over)}px` + (over <= padR ? ' (в пределах отступа — проверить)' : ''));
    else if (s.overflowX === 'hidden' && el.scrollWidth > el.clientWidth + 1 && s.whiteSpace === 'nowrap') add('textSpill', el, 'текст обрезан без многоточия');
    void padL;
  }
  // 2. Содержимое ячейки заходит в соседнюю колонку
  for (const td of visible.filter((e) => e.tagName === 'TD' || e.tagName === 'TH' || e.getAttribute('role') === 'cell' || e.getAttribute('role') === 'columnheader')) {
    const r = R(td);
    for (const ch of td.querySelectorAll('*')) {
      if (!vis(ch)) continue; const q = R(ch);
      if (q.width <= 2 || q.height <= 2 || ch.closest('.sr-only,.visually-hidden')) continue; // подпись для экранного диктора
      if (q.width && (q.right > r.right + 1 || q.left < r.left - 1)) { add('cellOverflow', ch, `выходит за ячейку на ${Math.round(Math.max(q.right - r.right, r.left - q.left))}px`); break; }
    }
  }
  // 2б. Отступ у краёв таблицы: содержимое первой и последней ячейки строки (текст, кнопка, бейдж)
  // не ближе 12 px к краю таблицы. Ловит кнопку, которая не выходит за ячейку, но съела её правый
  // отступ (колонка уже кнопки) — такое cellOverflow не видит. Край — видимая граница таблицы
  // или прокручиваемой обёртки, если таблица шире неё (закреплённые справа ячейки)
  const crng = document.createRange();
  for (const t of visible.filter((e) => e.tagName === 'TABLE')) {
    const tr = R(t);
    let edgeR = tr.right, edgeL = tr.left;
    for (let a = t.parentElement, i = 0; a && i < 4; a = a.parentElement, i++) {
      if (/(auto|scroll|hidden)/.test(getComputedStyle(a).overflowX)) { const ar = R(a); edgeR = Math.min(edgeR, ar.right); edgeL = Math.max(edgeL, ar.left); break; }
    }
    const hit = { r: 0, l: 0 };
    let firstR = null, firstL = null, worstR = 99, worstL = 99, hidden = null;
    for (const row of t.rows) {
      const cells = Array.from(row.cells).filter(vis);
      if (!cells.length) continue;
      const measure = (c) => { crng.selectNodeContents(c); const q = crng.getBoundingClientRect(); return q.width > 0 && (txt(c) || c.querySelector('button,input,svg,i,img')) ? q : null; };
      const last = cells[cells.length - 1], first = cells[0];
      // Последняя колонка за краем прокрутки — она не видна без горизонтальной прокрутки
      if (R(last).left >= edgeR - 2) { hidden = hidden || last; continue; }
      const qr = measure(last);
      if (qr && R(last).right >= edgeR - 2) { const g = edgeR - qr.right; if (g < 12) { hit.r++; if (g < worstR) { worstR = g; firstR = last; } } }
      const ql = measure(first);
      if (ql && R(first).left <= edgeL + 2) { const g = ql.left - edgeL; if (g < 12) { hit.l++; if (g < worstL) { worstL = g; firstL = first; } } }
    }
    if (hit.r) add('edgePad', firstR, `содержимое последней колонки в ${Math.max(0, Math.round(worstR))}px от правого края таблицы (строк: ${hit.r}) — нужно не меньше 12, в доме 16–18`);
    if (hidden) add('edgePad', hidden, 'последняя колонка за краем горизонтальной прокрутки — не видна без прокрутки; колонку действий закрепить справа');
    if (hit.l) add('edgePad', firstL, `содержимое первой колонки в ${Math.max(0, Math.round(worstL))}px от левого края таблицы (строк: ${hit.l})`);
  }
  // 3. Элемент выходит за рамку карточки / блока
  for (const box of visible) {
    const s = getComputedStyle(box);
    if (!(parseFloat(s.borderTopWidth) > 0 && parseFloat(s.borderTopLeftRadius) > 0) || s.overflow !== 'visible') continue;
    const r = R(box); if (r.width < 120 || r.height < 40) continue;
    for (const ch of box.children) {
      if (!vis(ch) || getComputedStyle(ch).position === 'fixed') continue;
      const q = R(ch);
      if (q.width && (q.right > r.right + 1 || q.bottom > r.bottom + 1 || q.left < r.left - 1)) { add('boxOverflow', ch, 'за рамкой блока ' + pathOf(box)); break; }
    }
  }
  // 4. Поле / кнопка / бейдж обрезаны предком с overflow: hidden
  const controls = visible.filter((e) => /^(INPUT|TEXTAREA|BUTTON|SELECT)$/.test(e.tagName) || e.getAttribute('role') === 'combobox');
  for (const el of controls) {
    const q = R(el); if (!q.width || !q.height) continue;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflow === 'visible' && s.overflowX === 'visible' && s.overflowY === 'visible') continue;
      if (/(auto|scroll)/.test(s.overflowX + s.overflowY)) break; // прокручиваемый контейнер — норма
      const r = R(a);
      const cut = Math.max(r.top - q.top, q.bottom - r.bottom, r.left - q.left, q.right - r.right);
      if (cut > 0.5 && cut < Math.max(q.height, q.width) * 0.6) add('clipped', el, `обрезан на ${cut.toFixed(1)}px контейнером ${pathOf(a)}`);
      break;
    }
  }
  // 5. Прокрутка в модальных окнах
  // Окна портала часто без role="dialog": считаем окном и фиксированную подложку на весь экран
  const modals = visible.filter((e) => {
    if (e.getAttribute('role') === 'dialog' || e.getAttribute('aria-modal') === 'true') return true;
    const s = getComputedStyle(e); if (s.position !== 'fixed') return false;
    const r = R(e); return r.width >= innerWidth - 2 && r.height >= innerHeight - 2 && e.children.length > 0 && s.backgroundColor !== 'rgba(0, 0, 0, 0)';
  }).filter((m, i, arr) => !arr.some((o) => o !== m && o.contains(m)));
  for (const m of modals) {
    for (const el of [m, ...m.querySelectorAll('*')]) {
      if (!vis(el)) continue; const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 2) add('modalScroll', el, `вертикальная: ${el.scrollHeight}px в ${el.clientHeight}px`);
      if (/(auto|scroll)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 2) add('modalScroll', el, `горизонтальная: ${el.scrollWidth}px в ${el.clientWidth}px`);
    }
  }
  // 5а. Шапка окна и пустое место справа (дефекты 21а, 21б). Панель окна — первый видимый потомок диалога
  // со своей подложкой (белый фон / скругление)
  for (const m of modals) {
    let box = null;
    for (const el of m.querySelectorAll('*')) {
      if (!vis(el)) continue; const s = getComputedStyle(el);
      if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' && parseFloat(s.borderTopLeftRadius) >= 8 && R(el).width > 300) { box = el; break; }
    }
    if (!box) continue;
    const b = R(box);
    // Шапка: первая строка-flex, у которой первый ребёнок — круглая иконка 24–48 px, второй — текст заголовка
    for (const row of box.querySelectorAll('*')) {
      if (R(row).top > b.top + 90) break;
      if (!vis(row) || getComputedStyle(row).display !== 'flex' || row.children.length < 2) continue;
      const [ic, tt] = row.children; const ri = R(ic), rt = R(tt);
      const round = parseFloat(getComputedStyle(ic).borderTopLeftRadius) >= ri.width / 2 - 1;
      if (!(round && ri.width >= 24 && ri.width <= 48 && Math.abs(ri.width - ri.height) < 2 && txt(tt))) continue;
      const d = Math.abs((ri.top + ri.height / 2) - (rt.top + rt.height / 2));
      if (d > 3) add('modalHead', tt, `центр заголовка смещён от центра иконки на ${d.toFixed(1)}px — alignItems: center`);
      break;
    }
    // Пустое место справа: самый правый край содержимого (поля, кнопки, текст) без шапки и подвала окна
    const leaves = [...box.querySelectorAll('*')].filter((e) => vis(e) && (/^(INPUT|BUTTON|TEXTAREA|SELECT|IMG|svg)$/.test(e.tagName)
      || [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())));
    const body = leaves.map(R).filter((r) => r.width > 0 && r.top > b.top + 72 && r.bottom < b.bottom - 72);
    if (body.length > 3) {
      const right = Math.max(...body.map((r) => r.right));
      const gap = b.right - right;
      if (gap > 140) add('modalEmpty', box, `справа пусто ${Math.round(gap)}px при ширине окна ${Math.round(b.width)}px — окно по содержимому или поля на всю ширину`);
    }
  }
  // 6. Горизонтальная прокрутка вне таблиц
  if (document.documentElement.scrollWidth > innerWidth + 1) add('hScroll', document.body, `страница шире окна: ${document.documentElement.scrollWidth}px при ${innerWidth}px`);
  for (const el of visible) {
    const s = getComputedStyle(el);
    if (!/(auto|scroll)/.test(s.overflowX) || el.scrollWidth <= el.clientWidth + 2) continue;
    if (el.querySelector('table,[role=table],[role=grid]') || el.closest('[role=dialog]')) continue;
    if (/tabs|seg|chip/i.test(el.className)) continue;
    add('hScroll', el, `${el.scrollWidth}px в ${el.clientWidth}px`);
  }
  // 7. Пустое место под таблицей
  // Меряем от последней строки до подвала (следующего видимого блока после обёртки таблицы),
  // а без подвала — до низа прокручиваемой обёртки фиксированной высоты
  for (const t of visible.filter((e) => e.tagName === 'TABLE' || e.getAttribute('role') === 'table')) {
    if (!t.querySelector('tbody tr, [role=row]')) continue;
    let sc = t.parentElement;
    for (let a = t.parentElement, i = 0; a && i < 3; a = a.parentElement, i++) if (/(auto|scroll)/.test(getComputedStyle(a).overflowY)) { sc = a; break; }
    if (!sc || sc.scrollHeight > sc.clientHeight + 1) continue; // строки не влезли — прокрутка, пустоты нет
    let foot = sc.nextElementSibling; while (foot && !vis(foot)) foot = foot.nextElementSibling;
    const bottom = R(t).bottom;
    const gap = foot ? R(foot).top - bottom : (/(auto|scroll)/.test(getComputedStyle(sc).overflowY) ? R(sc).bottom - bottom : 0);
    if (gap > 40) add('tableGap', t, `от последней строки до ${foot ? 'подвала' : 'низа блока'} пусто ${Math.round(gap)}px — высота таблицы должна быть по строкам`);
  }
  // 8. Поля одного ряда на разной высоте
  const fields = visible.filter((e) => (/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName) && e.type !== 'checkbox' && e.type !== 'radio' && e.type !== 'hidden') || e.getAttribute('role') === 'combobox')
    .map((e) => { let b = e; for (let a = e.parentElement, i = 0; a && i < 3; a = a.parentElement, i++) { const s = getComputedStyle(a); if (parseFloat(s.borderTopWidth) > 0) { b = a; break; } } return b; })
    .filter((e, i, arr) => arr.indexOf(e) === i);
  for (let i = 0; i < fields.length; i++) for (let j = i + 1; j < fields.length; j++) {
    const a = R(fields[i]), b = R(fields[j]);
    const dTop = Math.abs(a.top - b.top), hGap = Math.max(a.left, b.left) - Math.min(a.right, b.right);
    if (dTop >= 2 && dTop <= 12 && hGap >= 0 && hGap < 48 && Math.abs(a.height - b.height) < 6) add('misaligned', fields[j], `смещено по вертикали на ${dTop.toFixed(1)}px относительно ${pathOf(fields[i])}`);
  }
  // 9. Ограниченная ширина раздела на широком экране
  // Сравниваем с шириной родителя (сайдбар не в счёт): maxWidth сработал, если блок уже, чем место под него.
  // На 1366 такой блок обычно ещё не упирается в предел — дефект виден на 1920 / 2560.
  for (const el of visible) {
    const s = getComputedStyle(el); if (s.maxWidth === 'none' || s.maxWidth.endsWith('%') || el.closest('[role=dialog]')) continue;
    const p = el.parentElement; if (!p) continue;
    const ps = getComputedStyle(p), room = p.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight), w = R(el).width;
    if (w > 600 && room - w > 48 && Math.abs(w - parseFloat(s.maxWidth)) < 2) add('gutters', el, `maxWidth ${s.maxWidth}: справа/по бокам ${Math.round(room - w)}px пустого места`);
  }
  // 10. Нативные элементы вместо компонентов DS
  for (const el of visible) {
    if (el.tagName === 'SELECT') add('nativeUi', el, 'нативный <select>');
    if (el.tagName === 'INPUT' && /^(date|datetime-local|time|month)$/.test(el.type) && !el.hasAttribute('data-native')) add('nativeUi', el, 'системный календарь: ' + el.type);
  }
  // 11. Латиница и эмодзи в видимом тексте
  const OK = /^(PDF|SMS|QR|AI|Excel|Word|WhatsApp|Telegram|OK|eGov|egov|Face|FaceID|kz|KZ|RU|ru|EN|ENG|NCALayer|Halyk|Kaspi|Visa|Mastercard|Google|Chrome|Edge|XML|JSON|HTML|ZIP|DOCX|XLSX|JPEG|JPG|PNG|Email|email|mail|gov|www|http|https|isapp|portal)$/;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const p = n.parentElement; if (!p || !vis(p) || p.closest('script,style,code,pre,[data-audit-skip],.pp')) continue;
    const t = n.textContent;
    const words = (t.match(/[A-Za-z]{4,}/g) || []).filter((w) => !OK.test(w));
    if (words.length && !seen.has(words[0])) { seen.add(words[0]); add('latin', p, 'слова: ' + words.slice(0, 4).join(', ')); }
    if (/\p{Extended_Pictographic}/u.test(t.replace(/[©®™]/g, ''))) add('emoji', p, 'эмодзи в тексте');
  }
  // 12. Обводка плашки inset-тенью, а фон детей (шапка таблицы, подвал) доходит до края — дефект В5
  for (const box of visible) {
    const s = getComputedStyle(box);
    if (!/inset/.test(s.boxShadow) || parseFloat(s.borderTopWidth) > 0) continue;
    const r = R(box); if (r.width < 200 || r.height < 60) continue;
    const touch = Array.from(box.querySelectorAll('*')).find((ch) => {
      if (!vis(ch)) return false; const cs = getComputedStyle(ch);
      if (cs.backgroundColor === 'rgba(0, 0, 0, 0)' && cs.backgroundImage === 'none') return false;
      const q = R(ch); return q.width > r.width * 0.5 && (q.left - r.left < 1.5 || r.right - q.right < 1.5);
    });
    if (touch) add('insetStroke', box, 'обводка box-shadow inset перекрыта фоном ' + pathOf(touch) + ' (и ховером строк) — сделать border: 1px solid var(--n200)');
  }
  // 13. Повторы значений на странице — дефект А3. Строки таблиц и пунктов списков не считаем:
  // там повтор статуса — норма. Значение, которое встречается 2–3 раза, — кандидат в дубль
  const counts = new Map();
  for (const el of visible) {
    if (el.children.length || el.closest('header,nav,footer,[role=navigation],table,[role=table],[role=row],li,option,[role=option],[role=tab],[role=tablist]')) continue;
    const t = txt(el);
    if (t.length < 6 || t.length > 140 || !/[A-Za-zА-Яа-яЁё0-9]/.test(t)) continue;
    const list = counts.get(t) || []; list.push(el); counts.set(t, list);
  }
  for (const [t, list] of counts) if (list.length >= 2 && list.length <= 3) add('dupText', list[1], `«${t.slice(0, 50)}» показано ${list.length} раза — одно значение должно быть в одном месте (если это не осознанное исключение)`);
  // 14. Пояснительный текст: абзац мелкого серого текста — дефект А2. Ошибки и предупреждения цветные — не попадают
  for (const el of visible) {
    if (el.closest('table,label,button,a,[role=dialog] [role=alert]')) continue;
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
    if (own.length < 60) continue;
    const s = getComputedStyle(el), fs = parseFloat(s.fontSize);
    const c = (s.color.match(/[\d.]+/g) || []).map(Number);
    const grey = c.length >= 3 && Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]) < 30 && c[0] > 70;
    if (fs <= 14 && grey) add('proseHint', el, `пояснение ${own.length} знаков, ${fs}px серым — нужен ли этот текст? Если да — в data-tip`);
  }
  // 15. Кликабельное без :hover. Ховер, сделанный на JS (onMouseEnter), здесь не виден — такие находки проверить руками
  const hoverBase = [];
  const walkRules = (list) => { for (const ru of list) {
    if (ru.cssRules && !ru.selectorText) { walkRules(ru.cssRules); continue; }
    if (ru.selectorText && ru.selectorText.includes(':hover')) ru.selectorText.split(',').forEach((x) => { if (x.includes(':hover')) hoverBase.push(x.split(':hover')[0].trim() || '*'); });
  } };
  for (const sh of Array.from(document.styleSheets)) { try { walkRules(sh.cssRules); } catch (e) { /* чужой CSS с CDN */ } }
  const hasHover = (el) => hoverBase.some((sel) => { try { return el.matches(sel) || !!el.closest(sel); } catch (e) { return false; } });
  const clickables = visible.filter((e) => e.matches('a[href],button,[role=button],[role=tab],summary') || (getComputedStyle(e).cursor === 'pointer' && !e.parentElement.closest('a[href],button,[role=button]') && getComputedStyle(e.parentElement).cursor !== 'pointer'));
  for (const el of clickables) if (!el.disabled && !hasHover(el)) add('noHover', el, 'нет правила :hover — проверить наведение');
  // 16. Контраст текста (WCAG AA): обычный текст ≥ 4.5:1, крупный (≥ 24px или ≥ 18.66px жирный) ≥ 3:1
  const rgb = (c) => { const m = (c || '').match(/[\d.]+/g); return m ? m.map(Number) : null; };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const bgOf = (el) => { for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.backgroundImage !== 'none') return null; const c = rgb(s.backgroundColor); if (c && (c[3] === undefined || c[3] > 0.95)) return c; } return [255, 255, 255]; };
  const seenPair = new Set();
  for (const el of visible) {
    if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    if (el.closest('[disabled],[aria-disabled=true]')) continue;
    const s = getComputedStyle(el), bg = bgOf(el); if (!bg) continue;
    let fg = rgb(s.color); if (!fg) continue;
    const a = fg[3] === undefined ? 1 : fg[3]; fg = [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
    const L1 = lum(fg), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const fs = parseFloat(s.fontSize), big = fs >= 24 || (fs >= 18.66 && +s.fontWeight >= 700);
    const key = s.color + '|' + bg.join(',') + '|' + big;
    // < 1.3 — почти всегда фон рисует слой-подложка (backdrop, ::before), а не предок: не наш случай
    if (ratio >= 1.3 && ratio < (big ? 3 : 4.5) && !seenPair.has(key)) { seenPair.add(key); add('lowContrast', el, `контраст ${ratio.toFixed(2)}:1 (${s.color} на rgb(${bg.join(',')}), ${fs}px) — нужно ${big ? 3 : 4.5}:1`); }
  }
  const summary = Object.keys(out).map((k) => `${k}: ${out[k].length + (out[k].more || 0)}`).join(', ') || 'дефектов не найдено';
  return JSON.stringify({ viewport: innerWidth + '×' + innerHeight, summary, issues: out }, null, 1);
})()
