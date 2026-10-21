import { useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthContext, type AuthState } from './context'

/** Keeps the current Supabase session in React state for `useAuth()`. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ session: null, loading: true, signedOut: false })

  useEffect(() => {
    // Fires INITIAL_SESSION once the stored session is restored, then on every sign-in,
    // sign-out and token refresh. Keep the callback synchronous (supabase-js requirement).
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setState({ session, loading: false, signedOut: event === 'SIGNED_OUT' })
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return <AuthContext value={state}>{children}</AuthContext>
}
