import React from 'react';

const STATES = {
  info:    { color: 'var(--blue-base)',   light: 'var(--blue-lighter)',   icon: 'information-fill' },
  success: { color: 'var(--green-base)',  light: 'var(--green-lighter)',  icon: 'checkbox-circle-fill' },
  warning: { color: 'var(--orange-base)', light: 'var(--orange-lighter)', icon: 'alert-fill' },
  error:   { color: 'var(--red-base)',    light: 'var(--red-lighter)',    icon: 'error-warning-fill' },
  feature: { color: 'var(--purple-base)', light: 'var(--purple-lighter)', icon: 'magic-fill' },
};

/** Full-width announcement / page banner. variant: filled | light | stroke. */
export function Banner({ state = 'feature', variant = 'light', children, icon, action, onClose, className = '', style = {} }) {
  const s = STATES[state] || STATES.feature;
  const filled = variant === 'filled';
  const bg = filled ? s.color : (variant === 'stroke' ? 'var(--bg-white-0)' : s.light);
  const fg = filled ? '#fff' : 'var(--text-main-900)';

  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
      background: bg, color: fg,
      borderBottom: variant === 'stroke' ? '1px solid var(--stroke-soft-200)' : 'none',
      boxSizing: 'border-box', ...style,
    }}>
      <i className={`ri-${icon || s.icon}`} style={{ fontSize: 20, lineHeight: 1, color: filled ? '#fff' : s.color, flex: '0 0 auto' }} />
      <div className="text-label-sm" style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {action}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" style={{
          border: 'none', background: 'none', padding: 0, cursor: 'pointer',
          color: filled ? 'rgba(255,255,255,0.85)' : 'var(--icon-soft-400)', flex: '0 0 auto',
        }}>
          <i className="ri-close-line" style={{ fontSize: 20, lineHeight: 1 }} />
        </button>
      )}
    </div>
  );
}
