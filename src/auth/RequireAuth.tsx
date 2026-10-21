import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './context'

/**
 * Route wrapper for every page behind sign-in. A guest who opens one goes to Masuk and comes
 * back to it afterwards; after signing out, the next sign-in starts at Beranda instead.
 */
export function RequireAuth() {
  const { session, loading, signedOut } = useAuth()
  const { pathname, search, hash } = useLocation()
  if (loading) return null
  if (!session) {
    return <Navigate to="/masuk" replace state={signedOut ? undefined : { from: `${pathname}${search}${hash}` }} />
  }
  return <Outlet />
}
