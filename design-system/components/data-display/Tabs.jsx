import React from 'react';

/** Tab bar. items: [{value,label,icon,badge}]. Controlled via value/onChange or uncontrolled. */
export function Tabs({ items = [], value, defaultValue, onChange, variant = 'underline', className = '', style = {} }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const select = (v) => { if (value === undefined) setInternal(v); onChange && onChange(v); };

  const isPill = variant === 'pill';
  return (
    <div className={className} role="tablist" style={{
      display: 'inline-flex', alignItems: 'center', gap: isPill ? 4 : 0,
      borderBottom: isPill ? 'none' : '1px solid var(--stroke-soft-200)',
      background: isPill ? 'var(--bg-weak-100)' : 'transparent',
      padding: isPill ? 4 : 0, borderRadius: isPill ? 'var(--r-10)' : 0, ...style,
    }}>
      {items.map((it) => {
        const on = it.value === active;
        return (
          <button key={it.value} type="button" role="tab" aria-selected={on} onClick={() => select(it.value)}
            className="text-label-sm"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: isPill ? '6px 12px' : '10px 12px',
              border: 'none', background: isPill && on ? 'var(--bg-white-0)' : 'transparent',
              borderRadius: isPill ? 'var(--r-8)' : 0,
              boxShadow: isPill && on ? 'var(--shadow-xs)' : 'none',
              borderBottom: isPill ? 'none' : `2px solid ${on ? 'var(--primary-base)' : 'transparent'}`,
              marginBottom: isPill ? 0 : -1,
              color: on ? 'var(--text-main-900)' : 'var(--text-soft-400)',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color .15s ease',
            }}>
            {it.icon && <i className={`ri-${it.icon}`} style={{ fontSize: 18, lineHeight: 1 }} />}
            {it.label}
            {it.badge != null && (
              <span className="text-subheading-2xs" style={{
                background: on ? 'var(--primary-lighter)' : 'var(--bg-soft-200)',
                color: on ? 'var(--primary-base)' : 'var(--text-soft-400)',
                borderRadius: 'var(--r-full)', padding: '1px 6px', minWidth: 18, textAlign: 'center',
              }}>{it.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
