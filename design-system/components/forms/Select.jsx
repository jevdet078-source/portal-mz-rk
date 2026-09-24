import React from 'react';

const SIZES = {
  small:  { height: 36, radius: 'var(--r-8)',  padX: 10, font: 14, icon: 18 },
  medium: { height: 40, radius: 'var(--r-10)', padX: 12, font: 14, icon: 20 },
  large:  { height: 48, radius: 'var(--r-12)', padX: 14, font: 16, icon: 20 },
};

/** Lightweight styled select. Pass options as [{value,label}] or use children <option>. */
export function Select({
  size = 'medium', leadingIcon, error = false, disabled = false,
  value, defaultValue, onChange, options, placeholder, children,
  className = '', style = {}, ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--red-base)' : (focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)');

  return (
    <div
      className={className}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: 8,
        height: sz.height, padding: `0 ${sz.padX}px`, borderRadius: sz.radius,
        background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
        border: `1px solid ${borderColor}`,
        boxShadow: focus ? (error ? 'var(--ring-error)' : 'var(--ring-primary)') : 'none',
        transition: 'border-color .15s ease, box-shadow .15s ease',
        boxSizing: 'border-box', opacity: disabled ? 0.6 : 1, ...style,
      }}
    >
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: sz.icon, color: 'var(--icon-soft-400)', lineHeight: 1 }} />}
      <select
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1, minWidth: 0, appearance: 'none', WebkitAppearance: 'none',
          border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-sans)', fontSize: sz.font, color: 'var(--text-main-900)',
          letterSpacing: '-0.006em', cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        {...rest}
      >
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options ? options.map(o => <option key={o.value} value={o.value}>{o.label}</option>) : children}
      </select>
      <i className="ri-arrow-down-s-line" style={{ fontSize: sz.icon, color: 'var(--icon-soft-400)', lineHeight: 1, pointerEvents: 'none' }} />
    </div>
  );
}
