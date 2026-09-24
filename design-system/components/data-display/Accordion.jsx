import React from 'react';

/** Single collapsible accordion item. Use `defaultOpen` or control via `open`/`onToggle`. */
export function Accordion({ title, children, icon, open, defaultOpen = false, onToggle, className = '', style = {} }) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  const toggle = () => { if (open === undefined) setInternal(v => !v); onToggle && onToggle(!isOpen); };

  return (
    <div className={className} style={{
      border: '1px solid var(--stroke-soft-200)', borderRadius: 'var(--r-12)',
      background: 'var(--bg-white-0)', overflow: 'hidden', ...style,
    }}>
      <button type="button" onClick={toggle} style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: 16, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left',
      }}>
        {icon && <i className={`ri-${icon}`} style={{ fontSize: 20, color: 'var(--icon-sub-500)', lineHeight: 1 }} />}
        <span className="text-label-md" style={{ flex: 1, color: 'var(--text-main-900)' }}>{title}</span>
        <i className="ri-arrow-down-s-line" style={{ fontSize: 20, color: 'var(--icon-soft-400)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }} />
      </button>
      {isOpen && (
        <div className="text-paragraph-sm" style={{ padding: '0 16px 16px', color: 'var(--text-sub-500)' }}>{children}</div>
      )}
    </div>
  );
}
