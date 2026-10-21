import { useEffect, useState } from 'react'
import { useAuth } from '@/auth/context'
import { supabase, type Profile } from '@/lib/supabase'

/**
 * The signed-in user's row in `public.profiles` (null while it loads or if it can't be read),
 * plus the name and photo to show for them.
 */
export function useProfile() {
  const { session } = useAuth()
  const userId = session?.user.id
  const [row, setRow] = useState<Profile | null>(null)

  useEffect(() => {
    if (!userId) return
    let active = true
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setRow(data)
      })
    return () => {
      active = false
    }
  }, [userId])

  // Never hand out the previous account's row after switching users.
  const profile = row?.id === userId ? row : null
  // The profile is the source of truth (users will edit it); the sign-up metadata (email form:
  // full_name, Google: name / picture) covers the moment before it loads.
  const meta = session?.user.user_metadata ?? {}
  const name: string | undefined = profile?.full_name ?? meta.full_name ?? meta.name
  const avatarUrl: string | undefined = profile?.avatar_url ?? meta.avatar_url ?? meta.picture
  return { profile, name, avatarUrl }
}
