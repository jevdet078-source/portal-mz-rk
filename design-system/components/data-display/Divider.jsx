import React from 'react';

/** Horizontal or vertical divider, optionally with centered text/label. */
export function Divider({ children, orientation = 'horizontal', className = '', style = {} }) {
  if (orientation === 'vertical') {
    return <div className={className} style={{ width: 1, alignSelf: 'stretch', background: 'var(--stroke-soft-200)', ...style }} />;
  }
  if (children) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
        <span style={{ flex: 1, height: 1, background: 'var(--stroke-soft-200)' }} />
        <span className="text-subheading-xs" style={{ color: 'var(--text-soft-400)' }}>{children}</span>
        <span style={{ flex: 1, height: 1, background: 'var(--stroke-soft-200)' }} />
      </div>
    );
  }
  return <div className={className} style={{ height: 1, background: 'var(--stroke-soft-200)', ...style }} />;
}
