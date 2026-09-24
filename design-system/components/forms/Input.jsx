import React from 'react';

const SIZES = {
  small:  { height: 36, radius: 'var(--r-8)',  padX: 10, font: 14, icon: 18 },
  medium: { height: 40, radius: 'var(--r-10)', padX: 12, font: 14, icon: 20 },
  large:  { height: 48, radius: 'var(--r-12)', padX: 14, font: 16, icon: 20 },
};

export function Input({
  size = 'medium', leadingIcon, trailingIcon, error = false, disabled = false,
  value, defaultValue, placeholder, onChange, className = '', style = {}, inputStyle = {}, ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--red-base)' : (focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)');
  const ring = error ? 'var(--ring-error)' : 'var(--ring-primary)';

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: sz.height, padding: `0 ${sz.padX}px`, borderRadius: sz.radius,
        background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
        border: `1px solid ${borderColor}`,
        boxShadow: focus ? ring : 'none',
        transition: 'border-color .15s ease, box-shadow .15s ease',
        boxSizing: 'border-box', opacity: disabled ? 0.6 : 1, ...style,
      }}
    >
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: sz.icon, color: 'var(--icon-soft-400)', lineHeight: 1 }} />}
      <input
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-sans)', fontSize: sz.font, color: 'var(--text-main-900)',
          letterSpacing: '-0.006em', ...inputStyle,
        }}
        {...rest}
      />
      {trailingIcon && <i className={`ri-${trailingIcon}`} style={{ fontSize: sz.icon, color: 'var(--icon-soft-400)', lineHeight: 1 }} />}
    </div>
  );
}
