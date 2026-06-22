import React from 'react';

/**
 * Aqobah Button — primary CTA and supporting actions.
 * UI font (IBM Plex Sans), pill radius, soft brand glow on primary.
 */
export function Button({
  children,
  variant = 'primary',   // primary | secondary | ghost | accent | seal
  size = 'md',           // sm | md | lg
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', font: 'var(--text-sm)', gap: '7px' },
    md: { padding: '12px 24px', font: 'var(--text-base)', gap: '9px' },
    lg: { padding: '16px 34px', font: 'var(--text-md)', gap: '11px' },
  };

  const variants = {
    primary: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-brand)',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-brand)',
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--brand-primary)',
      border: '1.5px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--brand-primary)',
      border: '1.5px solid transparent',
      boxShadow: 'none',
    },
    accent: {
      background: 'var(--brand-accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-gold)',
    },
    seal: {
      background: 'var(--brand-seal)',
      color: '#fff',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-sm)',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: s.font,
        lineHeight: 1,
        padding: s.padding,
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
        letterSpacing: '0.01em',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
