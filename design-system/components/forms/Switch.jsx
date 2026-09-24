import React from 'react';

const SIZES = {
  small:  { w: 32, h: 20, knob: 16 },
  medium: { w: 40, h: 24, knob: 20 },
};

export function Switch({ checked, defaultChecked, onChange, disabled = false, size = 'medium', id, className = '', style = {}, ...rest }) {
  const sz = SIZES[size] || SIZES.medium;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      id={id}
      disabled={disabled}
      onClick={() => { if (disabled) return; if (!isControlled) setInternal(v => !v); onChange && onChange(!on); }}
      className={className}
      style={{
        width: sz.w, height: sz.h, flex: '0 0 auto', borderRadius: 'var(--r-full)',
        border: 'none', padding: 2, cursor: disabled ? 'not-allowed' : 'pointer',
        background: on ? 'var(--primary-base)' : 'var(--neutral-300)',
        opacity: disabled ? 0.5 : 1, transition: 'background .18s ease',
        display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <span style={{
        width: sz.knob, height: sz.knob, borderRadius: 'var(--r-full)', background: '#fff',
        boxShadow: 'var(--shadow-toggle)',
        transform: on ? `translateX(${sz.w - sz.knob - 4}px)` : 'translateX(0)',
        transition: 'transform .18s ease',
      }} />
    </button>
  );
}
