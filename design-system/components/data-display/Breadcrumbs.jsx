import React from 'react';

/** Breadcrumb trail. items: [{label, href, icon}]. Last item is the current page. */
export function Breadcrumbs({ items = [], className = '', style = {} }) {
  return (
    <nav className={className} aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 4, ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            <a href={it.href || '#'} className="text-label-sm" style={{
              display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none',
              color: last ? 'var(--text-main-900)' : 'var(--text-soft-400)',
              pointerEvents: last ? 'none' : 'auto',
            }}>
              {it.icon && <i className={`ri-${it.icon}`} style={{ fontSize: 16, lineHeight: 1 }} />}
              {it.label}
            </a>
            {!last && <i className="ri-arrow-right-s-line" style={{ fontSize: 18, color: 'var(--icon-disabled-300)', lineHeight: 1 }} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
