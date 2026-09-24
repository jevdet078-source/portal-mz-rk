import React from 'react';

/** Form field label. Optional required asterisk and muted sub-label. */
export function Label({ children, htmlFor, required = false, sublabel, disabled = false, className = '', style = {} }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-label-sm ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-main-900)', opacity: disabled ? 0.5 : 1, ...style }}
    >
      {children}
      {required && <span style={{ color: 'var(--primary-base)' }}>*</span>}
      {sublabel && <span className="text-paragraph-sm" style={{ color: 'var(--text-soft-400)' }}>{sublabel}</span>}
    </label>
  );
}
