import React from 'react';

/** Surface container. Subtle hairline ring + radius; optional padding & hover lift. */
export function Card({ children, padding = 20, hover = false, className = '', style = {} }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: 'var(--bg-white-0)', borderRadius: 'var(--r-16)',
        border: '1px solid var(--stroke-soft-200)',
        boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        padding, boxSizing: 'border-box',
        transition: 'box-shadow .2s ease, transform .2s ease',
        transform: h ? 'translateY(-2px)' : 'none', ...style,
      }}
    >
      {children}
    </div>
  );
}
