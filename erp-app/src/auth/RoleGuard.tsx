import type { ReactNode } from 'react'
import { useSession } from './SessionProvider'
import type { AppRole } from '../lib/types'

// Renders children only when the signed-in user's role is allowed.
// Use for role-gated nav items and action buttons.
export function RoleGuard({
  allow,
  children,
  fallback = null,
}: {
  allow: AppRole[]
  children: ReactNode
  fallback?: ReactNode
}) {
  const { role } = useSession()
  if (role && allow.includes(role)) return <>{children}</>
  return <>{fallback}</>
}
