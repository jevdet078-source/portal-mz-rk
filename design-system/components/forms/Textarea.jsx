import React from 'react';

export function Textarea({
  error = false, disabled = false, rows = 4, value, defaultValue, placeholder,
  onChange, showCounter = false, maxLength, className = '', style = {}, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [len, setLen] = React.useState((value ?? defaultValue ?? '').length);
  const borderColor = error ? 'var(--red-base)' : (focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)');

  return (
    <div
      className={className}
      style={{
        borderRadius: 'var(--r-12)',
        background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
        border: `1px solid ${borderColor}`,
        boxShadow: focus ? (error ? 'var(--ring-error)' : 'var(--ring-primary)') : 'none',
        transition: 'border-color .15s ease, box-shadow .15s ease',
        padding: 12, boxSizing: 'border-box', opacity: disabled ? 0.6 : 1, ...style,
      }}
    >
      <textarea
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(e) => { setLen(e.target.value.length); onChange && onChange(e); }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', border: 'none', outline: 'none', resize: 'vertical', background: 'transparent',
          fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: '20px', color: 'var(--text-main-900)',
          letterSpacing: '-0.006em', boxSizing: 'border-box', display: 'block',
        }}
        {...rest}
      />
      {showCounter && (
        <div style={{ textAlign: 'right', marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-soft-400)' }}>
          {len}{maxLength ? ` / ${maxLength}` : ''}
        </div>
      )}
    </div>
  );
}
