import React from 'react';

const STATUS = {
  online:      { color: 'var(--green-base)',  label: 'Online' },
  away:        { color: 'var(--yellow-base)', label: 'Away' },
  busy:        { color: 'var(--red-base)',    label: 'Busy' },
  offline:     { color: 'var(--neutral-400)', label: 'Offline' },
  pending:     { color: 'var(--orange-base)', label: 'Pending' },
  completed:   { color: 'var(--green-base)',  label: 'Completed' },
  cancelled:   { color: 'var(--red-base)',    label: 'Cancelled' },
  in_progress: { color: 'var(--blue-base)',   label: 'In progress' },
};

/** Dot + label status indicator. Pass a known `status` or custom `color`/`children`. */
export function StatusBadge({ status = 'online', children, color, variant = 'stroke', className = '', style = {} }) {
  const s = STATUS[status] || STATUS.online;
  const dot = color || s.color;
  const label = children || s.label;
  const isLight = variant === 'light';
  return (
    <span className={`text-label-sm ${className}`} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 8px', borderRadius: 'var(--r-6)',
      background: isLight ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      border: isLight ? '1px solid transparent' : '1px solid var(--stroke-soft-200)',
      color: 'var(--text-sub-500)', whiteSpace: 'nowrap', boxSizing: 'border-box', ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flex: '0 0 auto' }} />
      {label}
    </span>
  );
}
