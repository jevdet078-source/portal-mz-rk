import React from 'react';

const SIZES = {
  xsmall: { height: 32, radius: 'var(--r-8)',  padX: 10, gap: 4, font: 'var(--font-sans)', fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.006em', icon: 18 },
  small:  { height: 36, radius: 'var(--r-8)',  padX: 12, gap: 4, font: 'var(--font-sans)', fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.006em', icon: 20 },
  medium: { height: 40, radius: 'var(--r-10)', padX: 12, gap: 6, font: 'var(--font-sans)', fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.006em', icon: 20 },
  large:  { height: 48, radius: 'var(--r-12)', padX: 14, gap: 6, font: 'var(--font-sans)', fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: '-0.011em', icon: 20 },
};

// [variant][mode] => { bg, color, border, hoverBg, hoverColor, hoverBorder }
const PALETTE = {
  primary: {
    filled:  { bg: 'var(--primary-base)', color: 'var(--text-white-0)', hoverBg: 'var(--primary-dark)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--primary-base)', border: 'var(--primary-base)', hoverBg: 'var(--primary-lighter)' },
    lighter: { bg: 'var(--primary-lighter)', color: 'var(--primary-base)', hoverBg: 'var(--primary-light)' },
    ghost:   { bg: 'transparent', color: 'var(--primary-base)', hoverBg: 'var(--primary-lighter)' },
  },
  neutral: {
    filled:  { bg: 'var(--bg-strong-900)', color: 'var(--text-white-0)', hoverBg: 'var(--neutral-700)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--text-sub-500)', border: 'var(--stroke-soft-200)', hoverBg: 'var(--bg-weak-100)', hoverColor: 'var(--text-main-900)' },
    lighter: { bg: 'var(--bg-weak-100)', color: 'var(--text-sub-500)', hoverBg: 'var(--neutral-200)', hoverColor: 'var(--text-main-900)' },
    ghost:   { bg: 'transparent', color: 'var(--text-sub-500)', hoverBg: 'var(--bg-weak-100)', hoverColor: 'var(--text-main-900)' },
  },
  error: {
    filled:  { bg: 'var(--red-base)', color: 'var(--text-white-0)', hoverBg: 'var(--red-dark)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--red-base)', border: 'var(--red-base)', hoverBg: 'var(--red-lighter)' },
    lighter: { bg: 'var(--red-lighter)', color: 'var(--red-base)', hoverBg: 'var(--red-light)' },
    ghost:   { bg: 'transparent', color: 'var(--red-base)', hoverBg: 'var(--red-lighter)' },
  },
};

export function Button({
  children, variant = 'primary', mode = 'filled', size = 'medium',
  leadingIcon, trailingIcon, fullWidth = false, disabled = false,
  className = '', style = {}, ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const pal = (PALETTE[variant] || PALETTE.primary)[mode] || PALETTE.primary.filled;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;

  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center', justifyContent: 'center',
    gap: sz.gap,
    height: sz.height,
    padding: `0 ${sz.padX}px`,
    borderRadius: sz.radius,
    fontFamily: sz.font, fontSize: sz.fontSize, lineHeight: sz.lineHeight,
    fontWeight: sz.fontWeight, letterSpacing: sz.letterSpacing,
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: pal.border ? `1px solid ${active && pal.hoverBorder ? pal.hoverBorder : pal.border}` : '1px solid transparent',
    background: active && pal.hoverBg ? pal.hoverBg : pal.bg,
    color: active && pal.hoverColor ? pal.hoverColor : pal.color,
    transition: 'background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease',
    boxSizing: 'border-box',
    opacity: disabled ? 0.48 : 1,
    outline: 'none',
    ...style,
  };

  const iconStyle = { fontSize: sz.icon, lineHeight: 1, display: 'inline-flex', flex: '0 0 auto' };

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      style={base}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={iconStyle} />}
      {children != null && <span style={{ padding: '0 2px' }}>{children}</span>}
      {trailingIcon && <i className={`ri-${trailingIcon}`} style={iconStyle} />}
    </button>
  );
}
