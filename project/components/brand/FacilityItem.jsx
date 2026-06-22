import React from 'react';

/**
 * Aqobah FacilityItem — icon tile + title + short description.
 * Used for the haji/umrah facilities grid (Hotel, Muthawif, Maktab VIP, …).
 */
export function FacilityItem({
  icon = null,
  title,
  description,
  style = {},
}) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', ...style }}>
      <div style={{
        flex: 'none', width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
        background: 'var(--surface-brand-soft)', color: 'var(--brand-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-md)', margin: 0, color: 'var(--text-primary)' }}>{title}</h4>
        {description && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{description}</p>}
      </div>
    </div>
  );
}
