import React from 'react';

const STATES = {
  info:    { color: 'var(--blue-base)',   icon: 'information-fill' },
  success: { color: 'var(--green-base)',  icon: 'checkbox-circle-fill' },
  warning: { color: 'var(--orange-base)', icon: 'alert-fill' },
  error:   { color: 'var(--red-base)',    icon: 'error-warning-fill' },
  feature: { color: 'var(--purple-base)', icon: 'magic-fill' },
};

const LIGHT = {
  info: 'var(--blue-lighter)', success: 'var(--green-lighter)', warning: 'var(--orange-lighter)',
  error: 'var(--red-lighter)', feature: 'var(--purple-lighter)',
};

/** Inline alert. variant: filled | light | stroke. */
export function Alert({ state = 'info', variant = 'light', title, children, icon, onClose, action, className = '', style = {} }) {
  const s = STATES[state] || STATES.info;
  const filled = variant === 'filled';
  const stroke = variant === 'stroke';
  const bg = filled ? s.color : (stroke ? 'var(--bg-white-0)' : LIGHT[state]);
  const fg = filled ? '#fff' : 'var(--text-main-900)';
  const iconColor = filled ? '#fff' : s.color;

  return (
    <div className={className} style={{
      display: 'flex', gap: 10, padding: 12, borderRadius: 'var(--r-12)',
      background: bg, color: fg,
      border: stroke ? `1px solid var(--stroke-soft-200)` : '1px solid transparent',
      boxShadow: stroke ? 'var(--shadow-xs)' : 'none', boxSizing: 'border-box', ...style,
    }}>
      <i className={`ri-${icon || s.icon}`} style={{ fontSize: 20, lineHeight: 1, color: iconColor, flex: '0 0 auto', marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title && <div className="text-label-sm" style={{ color: fg }}>{title}</div>}
        {children && <div className="text-paragraph-sm" style={{ color: filled ? 'rgba(255,255,255,0.9)' : 'var(--text-sub-500)' }}>{children}</div>}
        {action && <div style={{ marginTop: 6 }}>{action}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" style={{
          border: 'none', background: 'none', padding: 0, cursor: 'pointer',
          color: filled ? 'rgba(255,255,255,0.8)' : 'var(--icon-soft-400)', flex: '0 0 auto',
        }}>
          <i className="ri-close-line" style={{ fontSize: 20, lineHeight: 1 }} />
        </button>
      )}
    </div>
  );
}
