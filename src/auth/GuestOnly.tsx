import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './context'

/**
 * Route wrapper for Masuk / Daftar: signed-in users are sent to the page `RequireAuth`
 * stopped them at, or to the app. This is also what moves the user on after signing in.
 */
export function GuestOnly() {
  const { session, loading } = useAuth()
  const { state } = useLocation()
  if (loading) return null
  if (!session) return <Outlet />
  const from: unknown = state?.from
  return <Navigate to={typeof from === 'string' ? from : '/'} replace />
}
