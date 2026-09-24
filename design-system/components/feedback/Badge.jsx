import React from 'react';

// color => { base, light, lighter }
const C = {
  gray:    { base: 'var(--neutral-500)', light: 'var(--neutral-200)',  lighter: 'var(--neutral-100)' },
  blue:    { base: 'var(--blue-base)',   light: 'var(--blue-light)',   lighter: 'var(--blue-lighter)' },
  orange:  { base: 'var(--orange-base)', light: 'var(--orange-light)', lighter: 'var(--orange-lighter)' },
  red:     { base: 'var(--red-base)',    light: 'var(--red-light)',    lighter: 'var(--red-lighter)' },
  green:   { base: 'var(--green-base)',  light: 'var(--green-light)',  lighter: 'var(--green-lighter)' },
  yellow:  { base: 'var(--yellow-base)', light: 'var(--yellow-light)', lighter: 'var(--yellow-lighter)' },
  purple:  { base: 'var(--purple-base)', light: 'var(--purple-light)', lighter: 'var(--purple-lighter)' },
  teal:    { base: 'var(--teal-base)',   light: 'var(--teal-light)',   lighter: 'var(--teal-lighter)' },
  pink:    { base: 'var(--pink-base)',   light: 'var(--pink-light)',   lighter: 'var(--pink-lighter)' },
};

const SIZES = { small: { h: 16, font: 11, padX: 6, icon: 12 }, medium: { h: 20, font: 12, padX: 8, icon: 14 } };

export function Badge({ children, color = 'gray', variant = 'light', size = 'medium', leadingIcon, dot = false, className = '', style = {} }) {
  const c = C[color] || C.gray;
  const sz = SIZES[size] || SIZES.medium;
  let bg, fg, border = 'transparent';
  if (variant === 'filled') { bg = c.base; fg = '#fff'; }
  else if (variant === 'light') { bg = c.light; fg = c.base; }
  else if (variant === 'lighter') { bg = c.lighter; fg = c.base; }
  else if (variant === 'stroke') { bg = 'transparent'; fg = c.base; border = c.base; }

  return (
    <span className={`text-subheading-2xs ${className}`} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: sz.h, padding: `0 ${sz.padX}px`, borderRadius: 'var(--r-full)',
      background: bg, color: fg, border: `1px solid ${border}`,
      fontSize: sz.font, letterSpacing: '0.02em', whiteSpace: 'nowrap', boxSizing: 'border-box', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {leadingIcon && <i className={`ri-${leadingIcon}`} style={{ fontSize: sz.icon, lineHeight: 1 }} />}
      {children}
    </span>
  );
}
