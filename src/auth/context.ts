import { createContext, useContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export type AuthState = {
  session: Session | null
  /** True until Supabase has restored (or ruled out) a stored session. */
  loading: boolean
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth() {
  const state = useContext(AuthContext)
  if (!state) throw new Error('useAuth must be used inside <AuthProvider>')
  return state
}
