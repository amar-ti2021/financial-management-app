import { Navigate, Outlet } from 'react-router'
import { useAuth } from './context'

/** Route wrapper for Masuk / Daftar: signed-in users are sent to the app instead. */
export function GuestOnly() {
  const { session, loading } = useAuth()
  if (loading) return null
  return session ? <Navigate to="/" replace /> : <Outlet />
}
