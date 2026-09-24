import React from 'react';

/** Hover/focus tooltip. Wraps its children; shows `content` on a dark bubble. */
export function Tooltip({ content, side = 'top', children, className = '', style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }[side];

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span role="tooltip" className="text-label-xs" style={{
          position: 'absolute', zIndex: 50, ...pos,
          background: 'var(--bg-strong-900)', color: 'var(--text-white-0)',
          padding: '4px 8px', borderRadius: 'var(--r-6)', whiteSpace: 'nowrap',
          boxShadow: 'var(--shadow-tooltip)', pointerEvents: 'none',
        }}>
          {content}
        </span>
      )}
    </span>
  );
}
