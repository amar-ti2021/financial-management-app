import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '@/auth/context'
import { supabase, type Profile, type ProfileUpdate } from '@/lib/supabase'
import { ProfileContext, type ProfileState } from './context'

type Loaded = { userId: string; row: Profile | null; failed: boolean }

/** Loads the signed-in user's profile once and shares it, so an edit shows up on every page at once. */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const userId = session?.user.id
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!userId) return
    let active = true
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (active) setLoaded({ userId, row: data, failed: !!error || !data })
      })
    return () => {
      active = false
    }
  }, [userId, attempt])

  const update = useCallback(
    async (changes: ProfileUpdate) => {
      if (!userId) throw new Error('Updating the profile needs a signed-in user')
      const { data, error } = await supabase.from('profiles').update(changes).eq('id', userId).select().single()
      if (data) setLoaded({ userId, row: data, failed: false })
      return error
    },
    [userId],
  )

  // Never hand out the previous account's row after switching users.
  const current = loaded?.userId === userId ? loaded : null
  const value = useMemo<ProfileState>(
    () => ({
      profile: current?.row ?? null,
      loadFailed: current?.failed ?? false,
      reload: () => {
        setLoaded(null)
        setAttempt((count) => count + 1)
      },
      update,
    }),
    [current, update],
  )

  return <ProfileContext value={value}>{children}</ProfileContext>
}
