import React from 'react';

/** Centered modal dialog with overlay. Controlled via `open`/`onClose`. */
export function Modal({ open, onClose, title, description, icon, iconColor = 'primary', children, footer, width = 440, className = '', style = {} }) {
  if (!open) return null;
  const ic = {
    primary: ['var(--primary-base)', 'var(--primary-lighter)'],
    success: ['var(--green-base)', 'var(--green-lighter)'],
    warning: ['var(--orange-base)', 'var(--orange-lighter)'],
    error: ['var(--red-base)', 'var(--red-lighter)'],
  }[iconColor] || ['var(--primary-base)', 'var(--primary-lighter)'];

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(14,18,27,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div className={className} onClick={(e) => e.stopPropagation()} style={{
        width, maxWidth: '100%', background: 'var(--bg-white-0)', borderRadius: 'var(--r-20)',
        boxShadow: 'var(--shadow-xl)', overflow: 'hidden', ...style,
      }}>
        <div style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          {icon && (
            <span style={{ width: 40, height: 40, flex: '0 0 auto', borderRadius: 'var(--r-full)', background: ic[1], color: ic[0], display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`ri-${icon}`} style={{ fontSize: 22 }} />
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && <div className="text-label-md" style={{ color: 'var(--text-main-900)' }}>{title}</div>}
            {description && <div className="text-paragraph-sm" style={{ color: 'var(--text-sub-500)', marginTop: 2 }}>{description}</div>}
          </div>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: 'var(--icon-soft-400)' }}>
              <i className="ri-close-line" style={{ fontSize: 22 }} />
            </button>
          )}
        </div>
        {children && <div style={{ padding: '0 20px 8px' }}>{children}</div>}
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: 20, borderTop: '1px solid var(--stroke-soft-200)', marginTop: 8 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
