import { NavLink, Outlet } from 'react-router-dom'
import { useSession } from '../../auth/SessionProvider'
import { Panel } from '../../components/ui'

// CRM shell: a tab row over the pipeline board, customers, and (admin/management)
// pipeline settings. Tabs render into the <Outlet>; routes live in App.tsx.
const TABS: { to: string; label: string; end: boolean; adminOnly?: boolean }[] = [
  { to: '/crm', label: 'Pipeline', end: true },
  { to: '/crm/customers', label: 'Pelanggan', end: false },
  { to: '/crm/settings', label: 'Pengaturan', end: false, adminOnly: true },
]

export function CrmLayout() {
  const { role } = useSession()
  const canConfig = role === 'admin' || role === 'management'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)' }}>
        {TABS.filter((t) => !t.adminOnly || canConfig).map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            style={({ isActive }) => ({
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
              marginBottom: -1,
            })}
          >
            {t.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

// Placeholder for CRM tabs whose real page lands in a later PR.
export function CrmComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <Panel title={title}>
      <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{note}</div>
    </Panel>
  )
}
