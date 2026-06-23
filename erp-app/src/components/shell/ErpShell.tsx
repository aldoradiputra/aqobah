import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { ERP_NAV, MODULE_META } from '../../lib/nav'
import { useSession } from '../../auth/SessionProvider'

const UNITS = ['Umrah', 'Haji', 'Halal', 'B2B']

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  management: 'Manajemen',
  sales: 'Sales',
  operational: 'Operasional',
  warehouse: 'Gudang',
  finance: 'Keuangan',
}

function initialsOf(name: string) {
  return (
    name
      .split(/[\s@._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? '')
      .join('') || 'AQ'
  )
}

function todayLabels() {
  const now = new Date()
  return {
    monthYear: new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' }).format(now),
    full: new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(now),
  }
}

export function ErpShell() {
  const location = useLocation()
  const path = location.pathname
  const active =
    ERP_NAV.find((n) => n.to !== '/' && (path === n.to || path.startsWith(n.to + '/')))?.key ?? 'dashboard'
  const meta = MODULE_META[active] ?? MODULE_META.dashboard
  const date = todayLabels()
  const navigate = useNavigate()
  const { user, profile, role, signOut } = useSession()
  const displayName = profile?.full_name || user?.email || 'Pengguna'
  const roleLabel = role ? ROLE_LABEL[role] ?? role : '—'
  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--surface-page)' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        style={{
          width: 248,
          flexShrink: 0,
          background: 'var(--surface-deep)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--indigo-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="18" r="18" fill="#142242" />
              <ellipse cx="18" cy="18" rx="8" ry="14" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <ellipse cx="18" cy="18" rx="14" ry="8" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <circle cx="18" cy="18" r="3" fill="#FCB017" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.15rem',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              AQOBAH
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                marginTop: 2,
              }}
            >
              ERP Console
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              padding: '6px 6px 8px',
            }}
          >
            Menu Utama
          </div>
          {ERP_NAV.filter((item) => !item.roles || (role != null && item.roles.includes(role))).map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-btn ${isActive ? 'nav-btn--active' : 'nav-btn--inactive'}`}
            >
              {({ isActive }) => (
                <>
                  <Icon name={item.icon} size={17} color={isActive ? '#FCB017' : 'rgba(255,255,255,0.65)'} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Unit selector */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 8,
              paddingLeft: 4,
            }}
          >
            Unit Bisnis
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {UNITS.map((u) => (
              <span
                key={u}
                style={{
                  fontSize: 11,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* User */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            className="avatar"
            style={{ width: 34, height: 34, background: 'var(--gold-300)', color: 'var(--indigo-800)', fontSize: 13 }}
          >
            {initialsOf(displayName)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {displayName}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>{roleLabel}</div>
          </div>
          <button
            title="Keluar"
            onClick={handleSignOut}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <Icon name="LogOut" size={15} color="rgba(255,255,255,0.45)" />
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 68,
            flexShrink: 0,
            background: 'var(--surface-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '0 28px',
            position: 'relative',
            zIndex: 10,
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.35rem',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {meta.title}
            </h1>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{meta.subtitle}</div>
          </div>

          <div className="search-bar">
            <Icon name="Search" size={15} color="var(--text-muted)" />
            <input type="text" placeholder="Cari jamaah, order, paket…" />
          </div>

          <button
            style={{
              position: 'relative',
              background: 'var(--surface-sunken)',
              border: 'none',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="Bell" size={17} color="var(--text-secondary)" />
            <span
              style={{
                position: 'absolute',
                top: 9,
                right: 10,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--danger-500)',
                border: '2px solid var(--surface-card)',
              }}
            />
          </button>

          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              borderLeft: '1px solid var(--border-subtle)',
              paddingLeft: 16,
              textTransform: 'capitalize',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{date.monthYear}</div>
            <div>{date.full}</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
