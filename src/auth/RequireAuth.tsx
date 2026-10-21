import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './context'

/** Route wrapper for every page behind sign-in: guests go to Masuk and come back here afterwards. */
export function RequireAuth() {
  const { session, loading } = useAuth()
  const { pathname, search, hash } = useLocation()
  if (loading) return null
  if (!session) return <Navigate to="/masuk" replace state={{ from: `${pathname}${search}${hash}` }} />
  return <Outlet />
}
