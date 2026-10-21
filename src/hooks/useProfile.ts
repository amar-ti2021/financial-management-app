import { useEffect, useState } from 'react'
import { useAuth } from '@/auth/context'
import { supabase, type Profile } from '@/lib/supabase'

/**
 * The signed-in user's row in `public.profiles`. Null while it loads or if it can't be read,
 * so callers fall back to the session's sign-up metadata.
 */
export function useProfile() {
  const { session } = useAuth()
  const userId = session?.user.id
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    if (!userId) return
    let active = true
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setProfile(data)
      })
    return () => {
      active = false
    }
  }, [userId])

  // Never hand out the previous account's row after switching users.
  return profile?.id === userId ? profile : null
}
