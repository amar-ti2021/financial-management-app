import { createContext, useContext } from 'react'
import type { PostgrestError } from '@supabase/supabase-js'
import { useAuth } from '@/auth/context'
import type { Profile, ProfileUpdate } from '@/lib/supabase'

export type ProfileState = {
  /** The signed-in user's row in `public.profiles`; null while it loads or if it can't be read. */
  profile: Profile | null
  /** Loading the row failed; `reload()` tries again. */
  loadFailed: boolean
  reload: () => void
  /** Saves `changes` and, once stored, shows them on every page. */
  update: (changes: ProfileUpdate) => Promise<PostgrestError | null>
}

export const ProfileContext = createContext<ProfileState | null>(null)

/** The profile state plus the name and photo to show for the signed-in user. */
export function useProfile() {
  const { session } = useAuth()
  const state = useContext(ProfileContext)
  if (!state) throw new Error('useProfile must be used inside <ProfileProvider>')

  // The profile is the source of truth (users edit it); until it loads, the sign-up metadata
  // stands in (email form: full_name; Google: name, picture).
  const { profile } = state
  const meta = session?.user.user_metadata ?? {}
  const name: string | undefined = profile ? (profile.full_name ?? undefined) : (meta.full_name ?? meta.name)
  const avatarUrl: string | undefined = profile ? (profile.avatar_url ?? undefined) : (meta.avatar_url ?? meta.picture)
  return { ...state, name, avatarUrl }
}
