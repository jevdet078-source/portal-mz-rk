import React from 'react';

/** Rectangular tag/chip with optional leading icon and dismiss button. */
export function Tag({ children, variant = 'stroke', leadingIcon, onDismiss, disabled = false, className = '', style = {} }) {
  const filled = variant === 'gray';
  return (
    <span className={`text-label-sm ${className}`} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 8px', borderRadius: 'var(--r-6)',
      background: filled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      color: 'var(--text-sub-500)',
      border: filled ? '1px solid transparent' : '1px solid var(--stroke-soft-200)',
      opacity: disabled ? 0.5 : 1, whiteSpace: 'nowrap', boxSizing: 'border-box', ...style,
    }}>
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: 16, color: 'var(--icon-soft-400)', lineHeight: 1 }} />}
      {children}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Remove" style={{
          display: 'inline-flex', border: 'none', background: 'none', padding: 0, marginLeft: 2,
          color: 'var(--icon-soft-400)', cursor: 'pointer',
        }}>
          <i className="ri-close-line" style={{ fontSize: 16, lineHeight: 1 }} />
        </button>
      )}
    </span>
  );
}
