import React from 'react';

/**
 * Aqobah Input — labelled text field.
 */
export function Input({
  label,
  hint,
  error,
  iconLeft = null,
  id,
  type = 'text',
  style = {},
  ...rest
}) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--danger-500)' : focused ? 'var(--border-focus)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-ui)' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '9px',
        background: 'var(--surface-card)',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)',
        padding: '0 14px',
        boxShadow: focused ? 'var(--ring-focus)' : 'none',
        transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}>
        {iconLeft && <span style={{ color: 'var(--text-muted)', display: 'flex' }}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)',
            color: 'var(--text-primary)', padding: '11px 0',
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--danger-500)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
