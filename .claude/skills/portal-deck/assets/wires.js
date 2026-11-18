// Соединительные линии между блоками схемы — считаются по фактической раскладке.
// wire(fromSel, toSel, { dir: 'v' | 'h', color, width, dash, dotFrom, dotTo, fx, tx })
//   dir 'v' — от низа A к верху B; 'h' — от правого края A к левому краю B.
//   fx / tx — доля по ширине (v) или высоте (h) для точки выхода/входа (0..1), по умолчанию 0.5.
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  function svg() {
    let s = document.querySelector('svg.wires');
    if (!s) {
      s = document.createElementNS(NS, 'svg');
      s.setAttribute('class', 'wires');
      s.setAttribute('viewBox', '0 0 1920 1080');
      document.querySelector('.slide').prepend(s);
    }
    return s;
  }
  function box(sel) {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  }
  function dot(s, x, y, color, r) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
    c.setAttribute('fill', color);
    s.appendChild(c);
  }
  window.wire = function (from, to, o = {}) {
    const s = svg();
    const a = box(from), b = box(to);
    const color = o.color || '#9CC9DD', w = o.width || 2, r = o.r ?? 4.5;
    const fx = o.fx ?? 0.5, tx = o.tx ?? 0.5;
    let x1, y1, x2, y2, d;
    if (o.dir === 'h') {
      x1 = a.x + a.w + (o.gapFrom || 0); y1 = a.y + a.h * fx;
      x2 = b.x - (o.gapTo || 0); y2 = b.y + b.h * tx;
      const m = (x1 + x2) / 2;
      d = `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`;
    } else {
      x1 = a.x + a.w * fx; y1 = a.y + a.h + (o.gapFrom || 0);
      x2 = o.straight ? x1 : b.x + b.w * tx; y2 = b.y - (o.gapTo || 0);
      const m = (y1 + y2) / 2;
      d = `M${x1},${y1} C${x1},${m} ${x2},${m} ${x2},${y2}`;
    }
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); p.setAttribute('fill', 'none');
    p.setAttribute('stroke', color); p.setAttribute('stroke-width', w);
    p.setAttribute('stroke-linecap', 'round');
    if (o.dash) p.setAttribute('stroke-dasharray', o.dash);
    s.appendChild(p);
    if (o.dotFrom !== false) dot(s, x1, y1, o.dotColor || color, r);
    if (o.dotTo !== false) dot(s, x2, y2, o.dotColor || color, r);
  };
  window.whenReady = function (fn) {
    const go = () => { fn(); document.body.dataset.ready = '1'; };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(() => requestAnimationFrame(go)));
  };
})();
