import React from 'react';

export function Checkbox({ checked, defaultChecked, onChange, disabled = false, indeterminate = false, id, className = '', style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const filled = on || indeterminate;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : on}
      id={id}
      disabled={disabled}
      onClick={() => { if (disabled) return; if (!isControlled) setInternal(v => !v); onChange && onChange(!on); }}
      className={className}
      style={{
        width: 20, height: 20, flex: '0 0 auto', borderRadius: 'var(--r-6)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: filled ? 'none' : '1px solid var(--stroke-sub-300)',
        background: filled ? 'var(--primary-base)' : 'var(--bg-white-0)',
        color: '#fff', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, padding: 0, transition: 'background .12s ease, border-color .12s ease',
        boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      {indeterminate
        ? <i className="ri-subtract-line" style={{ fontSize: 16, lineHeight: 1 }} />
        : on && <i className="ri-check-line" style={{ fontSize: 16, lineHeight: 1 }} />}
    </button>
  );
}
