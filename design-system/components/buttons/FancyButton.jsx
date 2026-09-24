import React from 'react';

const SIZES = {
  xsmall: { height: 32, radius: 'var(--r-8)',  padX: 12, fontSize: 14, icon: 18 },
  small:  { height: 36, radius: 'var(--r-8)',  padX: 14, fontSize: 14, icon: 20 },
  medium: { height: 40, radius: 'var(--r-10)', padX: 16, fontSize: 14, icon: 20 },
  large:  { height: 48, radius: 'var(--r-12)', padX: 20, fontSize: 16, icon: 20 },
};

// Fancy buttons add an inset top-highlight + soft drop shadow for a raised, glossy CTA.
const COLORS = {
  primary: { bg: 'var(--primary-base)', color: '#fff', hoverBg: 'var(--primary-dark)', ring: 'rgba(77,66,233,0.40)' },
  neutral: { bg: 'var(--bg-strong-900)', color: '#fff', hoverBg: 'var(--neutral-700)', ring: 'rgba(14,18,27,0.40)' },
  error:   { bg: 'var(--red-base)', color: '#fff', hoverBg: 'var(--red-dark)', ring: 'rgba(223,28,65,0.40)' },
};

export function FancyButton({
  children, variant = 'primary', size = 'medium',
  leadingIcon, trailingIcon, fullWidth = false, disabled = false,
  className = '', style = {}, ...rest
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
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: 6,
        height: sz.height, padding: `0 ${sz.padX}px`, borderRadius: sz.radius,
        border: 'none',
        background: active ? c.hoverBg : c.bg,
        color: c.color,
        fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: sz.fontSize, letterSpacing: '-0.006em',
        whiteSpace: 'nowrap',
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 -2px 4px 0 rgba(14,18,27,0.20), 0 1px 2px 0 ${c.ring}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.48 : 1,
        transition: 'background .15s ease', boxSizing: 'border-box', outline: 'none', ...style,
      }}
      {...rest}
    >
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />}
      {children}
      {trailingIcon && <i className={`ri-${trailingIcon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />}
    </button>
  );
}
