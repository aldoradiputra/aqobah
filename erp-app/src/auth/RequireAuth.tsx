import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from './SessionProvider'

// Gates the ERP shell: unauthenticated users are sent to /login.
export function RequireAuth() {
  const { session, loading } = useSession()
  const location = useLocation()

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-ui)',
          fontSize: 14,
        }}
      >
        Memuat…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
