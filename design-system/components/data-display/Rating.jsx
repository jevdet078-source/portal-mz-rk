import React from 'react';

/** Star rating. Read-only by default; pass onChange to make interactive. */
export function Rating({ value = 0, max = 5, size = 20, onChange, className = '', style = {} }) {
  const [hover, setHover] = React.useState(0);
  const interactive = typeof onChange === 'function';
  const shown = hover || value;
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }}
      onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const filled = n <= shown;
        return (
          <i key={i}
            className={filled ? 'ri-star-fill' : 'ri-star-line'}
            onMouseEnter={() => interactive && setHover(n)}
            onClick={() => interactive && onChange(n)}
            style={{
              fontSize: size, lineHeight: 1,
              color: filled ? 'var(--yellow-base)' : 'var(--neutral-300)',
              cursor: interactive ? 'pointer' : 'default',
            }} />
        );
      })}
    </div>
  );
}
