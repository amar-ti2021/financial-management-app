import { Navigate, Outlet, useLocation } from 'react-router'
import { mustChangePassword, useAuth } from './context'

/**
 * Root route: while the signed-in account still has its temporary password, every page
 * leads to Ganti kata sandi. The database holds back superadmin rights until then too.
 */
export function PasswordChangeGate() {
  const { session } = useAuth()
  const { pathname } = useLocation()
  if (mustChangePassword(session) && pathname !== '/ganti-kata-sandi') {
    return <Navigate to="/ganti-kata-sandi" replace />
  }
  return <Outlet />
}
