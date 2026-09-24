import React from 'react';

/** Pagination control. Controlled via page/onChange. */
export function Pagination({ page = 1, total = 1, onChange, siblings = 1, className = '', style = {} }) {
  const go = (p) => { if (p < 1 || p > total || p === page) return; onChange && onChange(p); };
  const range = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  range.push(1);
  if (left > 2) range.push('…');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('…');
  if (total > 1) range.push(total);

  const cell = (content, opts = {}) => (
    <button type="button" onClick={opts.onClick} disabled={opts.disabled}
      className="text-label-sm"
      style={{
        minWidth: 36, height: 36, padding: '0 8px', borderRadius: 'var(--r-8)',
        border: opts.active ? '1px solid var(--stroke-soft-200)' : '1px solid transparent',
        background: opts.active ? 'var(--bg-white-0)' : 'transparent',
        boxShadow: opts.active ? 'var(--shadow-xs)' : 'none',
        color: opts.disabled ? 'var(--text-disabled-300)' : (opts.active ? 'var(--text-main-900)' : 'var(--text-soft-400)'),
        cursor: opts.disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
      {content}
    </button>
  );

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, ...style }}>
      {cell(<i className="ri-arrow-left-s-line" style={{ fontSize: 20 }} />, { onClick: () => go(page - 1), disabled: page === 1 })}
      {range.map((r, i) => r === '…'
        ? <span key={i} style={{ minWidth: 24, textAlign: 'center', color: 'var(--text-disabled-300)' }}>…</span>
        : <React.Fragment key={i}>{cell(r, { onClick: () => go(r), active: r === page })}</React.Fragment>)}
      {cell(<i className="ri-arrow-right-s-line" style={{ fontSize: 20 }} />, { onClick: () => go(page + 1), disabled: page === total })}
    </div>
  );
}
