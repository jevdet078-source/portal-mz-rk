import React from 'react';

const SIZES = {
  small:  { fontSize: 14, lineHeight: '20px', icon: 18, gap: 2 },
  medium: { fontSize: 14, lineHeight: '20px', icon: 20, gap: 4 },
  large:  { fontSize: 16, lineHeight: '24px', icon: 20, gap: 4 },
};

const COLORS = {
  primary: { color: 'var(--primary-base)', hover: 'var(--primary-dark)' },
  neutral: { color: 'var(--text-sub-500)', hover: 'var(--text-main-900)' },
  error:   { color: 'var(--red-base)', hover: 'var(--red-dark)' },
  white:   { color: 'var(--text-white-0)', hover: 'var(--neutral-200)' },
};

export function LinkButton({
  children, variant = 'primary', size = 'medium', underline = false,
  leadingIcon, trailingIcon, disabled = false, className = '', style = {}, ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const c = COLORS[variant] || COLORS.primary;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: sz.gap,
        background: 'none', border: 'none', padding: 0,
        fontFamily: 'var(--font-sans)', fontWeight: 500,
        fontSize: sz.fontSize, lineHeight: sz.lineHeight, letterSpacing: '-0.006em',
        color: active ? c.hover : c.color,
        textDecoration: underline ? 'underline' : 'none',
        textUnderlineOffset: 3,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.48 : 1,
        transition: 'color .15s ease', outline: 'none', ...style,
      }}
      {...rest}
    >
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />}
      {children}
      {trailingIcon && <i className={`ri-${trailingIcon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />}
    </button>
  );
}
