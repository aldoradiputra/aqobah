import React from 'react';

/**
 * Aqobah Card — soft elevated surface container.
 */
export function Card({
  children,
  elevation = 'sm',      // flat | sm | md | lg
  padding = 'md',        // none | sm | md | lg
  goldTop = false,       // premium gold hairline along the top edge
  interactive = false,
  style = {},
  ...rest
}) {
  const pads = { none: '0', sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)' };
  const shadows = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  };

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-card)',
        boxShadow: shadows[elevation] ?? shadows.sm,
        padding: pads[padding] ?? pads.md,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={interactive ? (e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = shadows[elevation] ?? shadows.sm;
      } : undefined}
      {...rest}
    >
      {goldTop && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, var(--gold-300), var(--gold-400))',
        }} />
      )}
      {children}
    </div>
  );
}
