import React from 'react';

const COLORS = {
  primary: 'var(--primary-base)', green: 'var(--green-base)', orange: 'var(--orange-base)',
  red: 'var(--red-base)', blue: 'var(--blue-base)', neutral: 'var(--neutral-900)',
};

/** Linear progress bar. value 0–100. */
export function ProgressBar({ value = 0, color = 'primary', size = 'medium', showLabel = false, className = '', style = {} }) {
  const h = size === 'small' ? 4 : size === 'large' ? 10 : 6;
  const fill = COLORS[color] || COLORS.primary;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ flex: 1, height: h, borderRadius: 'var(--r-full)', background: 'var(--bg-soft-200)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 'var(--r-full)', background: fill, transition: 'width .3s ease' }} />
      </div>
      {showLabel && <span className="text-label-sm" style={{ color: 'var(--text-sub-500)', minWidth: 36, textAlign: 'right' }}>{Math.round(pct)}%</span>}
    </div>
  );
}
