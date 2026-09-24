import React from 'react';

const SIZES = { 20: 8, 24: 9, 32: 12, 40: 14, 48: 16, 56: 18, 64: 20, 80: 24 };
const DOT = { 20: 6, 24: 7, 32: 8, 40: 10, 48: 12, 56: 14, 64: 16, 80: 18 };

const PLACEHOLDER_BG = {
  gray: 'var(--neutral-200)', blue: 'var(--blue-light)', purple: 'var(--purple-light)',
  orange: 'var(--orange-light)', green: 'var(--green-light)', yellow: 'var(--yellow-light)',
};
const PLACEHOLDER_FG = {
  gray: 'var(--neutral-500)', blue: 'var(--blue-base)', purple: 'var(--purple-base)',
  orange: 'var(--orange-dark)', green: 'var(--green-dark)', yellow: 'var(--yellow-dark)',
};

const STATUS = { online: 'var(--green-base)', away: 'var(--yellow-base)', busy: 'var(--red-base)', offline: 'var(--neutral-400)' };

/** Circular avatar. Pass `src` (image), or `initials`/`color` for a placeholder. */
export function Avatar({ src, alt = '', initials, color = 'gray', size = 40, status, className = '', style = {} }) {
  const font = SIZES[size] || 14;
  const dot = DOT[size] || 10;
  return (
    <span className={className} style={{ position: 'relative', display: 'inline-flex', width: size, height: size, flex: '0 0 auto', ...style }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: PLACEHOLDER_BG[color] || PLACEHOLDER_BG.gray,
          color: PLACEHOLDER_FG[color] || PLACEHOLDER_FG.gray,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: font, letterSpacing: '-0.01em',
        }}>
          {initials || <i className="ri-user-3-fill" style={{ fontSize: font * 1.3 }} />}
        </span>
      )}
      {status && (
        <span style={{
          position: 'absolute', right: 0, bottom: 0, width: dot, height: dot, borderRadius: '50%',
          background: STATUS[status] || STATUS.online, border: '2px solid var(--bg-white-0)', boxSizing: 'content-box',
          transform: 'translate(15%, 15%)',
        }} />
      )}
    </span>
  );
}
