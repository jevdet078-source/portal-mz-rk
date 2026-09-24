import React from 'react';

const SIZES = {
  xsmall: { box: 32, radius: 'var(--r-8)',  icon: 18 },
  small:  { box: 36, radius: 'var(--r-8)',  icon: 20 },
  medium: { box: 40, radius: 'var(--r-10)', icon: 20 },
  large:  { box: 48, radius: 'var(--r-12)', icon: 24 },
};

const PALETTE = {
  primary: {
    filled:  { bg: 'var(--primary-base)', color: 'var(--text-white-0)', hoverBg: 'var(--primary-dark)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--primary-base)', border: 'var(--primary-base)', hoverBg: 'var(--primary-lighter)' },
    lighter: { bg: 'var(--primary-lighter)', color: 'var(--primary-base)', hoverBg: 'var(--primary-light)' },
    ghost:   { bg: 'transparent', color: 'var(--primary-base)', hoverBg: 'var(--primary-lighter)' },
  },
  neutral: {
    filled:  { bg: 'var(--bg-strong-900)', color: 'var(--text-white-0)', hoverBg: 'var(--neutral-700)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--icon-sub-500)', border: 'var(--stroke-soft-200)', hoverBg: 'var(--bg-weak-100)', hoverColor: 'var(--icon-strong-900)' },
    lighter: { bg: 'var(--bg-weak-100)', color: 'var(--icon-sub-500)', hoverBg: 'var(--neutral-200)', hoverColor: 'var(--icon-strong-900)' },
    ghost:   { bg: 'transparent', color: 'var(--icon-soft-400)', hoverBg: 'var(--bg-weak-100)', hoverColor: 'var(--icon-strong-900)' },
  },
  error: {
    filled:  { bg: 'var(--red-base)', color: 'var(--text-white-0)', hoverBg: 'var(--red-dark)' },
    stroke:  { bg: 'var(--bg-white-0)', color: 'var(--red-base)', border: 'var(--red-base)', hoverBg: 'var(--red-lighter)' },
    lighter: { bg: 'var(--red-lighter)', color: 'var(--red-base)', hoverBg: 'var(--red-light)' },
    ghost:   { bg: 'transparent', color: 'var(--red-base)', hoverBg: 'var(--red-lighter)' },
  },
};

export function IconButton({
  icon, variant = 'neutral', mode = 'stroke', size = 'medium',
  disabled = false, className = '', style = {}, ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const pal = (PALETTE[variant] || PALETTE.neutral)[mode] || PALETTE.neutral.stroke;
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
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: sz.box, height: sz.box, borderRadius: sz.radius,
        border: pal.border ? `1px solid ${pal.border}` : '1px solid transparent',
        background: active && pal.hoverBg ? pal.hoverBg : pal.bg,
        color: active && pal.hoverColor ? pal.hoverColor : pal.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.48 : 1,
        transition: 'background .15s ease, color .15s ease, border-color .15s ease',
        boxSizing: 'border-box', outline: 'none', ...style,
      }}
      {...rest}
    >
      <i className={`ri-${icon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />
    </button>
  );
}
