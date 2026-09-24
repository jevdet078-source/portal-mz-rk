import React from 'react';

/** Helper / validation text shown under a field. */
export function Hint({ children, state = 'default', icon = 'information-line', className = '', style = {} }) {
  const color = state === 'error' ? 'var(--red-base)'
    : state === 'success' ? 'var(--green-base)'
    : 'var(--text-soft-400)';
  const ic = state === 'error' ? 'error-warning-line' : state === 'success' ? 'checkbox-circle-line' : icon;
  return (
    <div className={`text-paragraph-xs ${className}`} style={{ display: 'flex', alignItems: 'center', gap: 4, color, ...style }}>
      {ic && <i className={`ri-${ic}`} style={{ fontSize: 16, lineHeight: 1 }} />}
      <span>{children}</span>
    </div>
  );
}
