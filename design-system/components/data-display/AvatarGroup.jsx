import React from 'react';
import { Avatar } from './Avatar.jsx';

/** Overlapping stack of avatars with an optional +N overflow chip. */
export function AvatarGroup({ items = [], size = 32, max = 4, className = '', style = {} }) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  const overlap = Math.round(size * 0.3);
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      {shown.map((it, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -overlap, borderRadius: '50%', boxShadow: '0 0 0 2px var(--bg-white-0)', display: 'inline-flex' }}>
          <Avatar size={size} {...it} />
        </span>
      ))}
      {extra > 0 && (
        <span style={{
          marginLeft: -overlap, width: size, height: size, borderRadius: '50%',
          background: 'var(--bg-weak-100)', color: 'var(--text-sub-500)',
          boxShadow: '0 0 0 2px var(--bg-white-0)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: Math.max(10, size * 0.34),
        }}>+{extra}</span>
      )}
    </div>
  );
}
