import React from 'react';

export function Radio({ checked, defaultChecked, onChange, name, value, disabled = false, id, className = '', style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      id={id}
      disabled={disabled}
      onClick={() => { if (disabled) return; if (!isControlled) setInternal(true); onChange && onChange(value ?? true); }}
      className={className}
      style={{
        width: 20, height: 20, flex: '0 0 auto', borderRadius: 'var(--r-full)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${on ? 'var(--primary-base)' : 'var(--stroke-sub-300)'}`,
        background: 'var(--bg-white-0)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, padding: 0, transition: 'border-color .12s ease',
        boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <span style={{
        width: 10, height: 10, borderRadius: 'var(--r-full)',
        background: 'var(--primary-base)', transform: on ? 'scale(1)' : 'scale(0)',
        transition: 'transform .12s ease',
      }} />
    </button>
  );
}
