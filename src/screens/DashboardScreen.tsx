import { useAuth } from '@/auth/context'
import { BottomNav, BrandHeader, MobileShell, type BottomNavItem } from '@/components/layout'
import { IconButton, PageIntro } from '@/components/ui'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/lib/supabase'

// The app's main tabs. None of their pages exist yet, so they don't link anywhere;
// give each a `to` once its page is built (Beranda: `to: '/', end: true`).
const tabs: BottomNavItem[] = [
  { label: 'Beranda', icon: 'home', active: true },
  { label: 'Catat', icon: 'add_circle' },
  { label: 'Pinjaman', icon: 'credit_card' },
  { label: 'Kalkulator', icon: 'calculate' },
]

/** Beranda. For now only the app bar and the greeting; the cards follow with their features. */
export function DashboardScreen() {
  const { session } = useAuth()
  const profile = useProfile()
  // RequireAuth only renders this page with a session.
  if (!session) return null

  // The profile is the source of truth (users will edit it there); the sign-up metadata
  // (email form: full_name, Google: name / picture) covers the moment before it loads.
  const meta = session.user.user_metadata
  const name: string | undefined = profile?.full_name ?? meta.full_name ?? meta.name
  const firstName = name?.trim().split(/\s+/)[0]

  return (
    <MobileShell bottomInset="nav">
      <BrandHeader
        userName={name ?? session.user.email ?? 'Akun'}
        avatarSrc={profile?.avatar_url ?? meta.avatar_url ?? meta.picture}
        // Sign-out sits here until the Profil page exists; the design has a notification bell here.
        action={<IconButton icon="logout" label="Keluar" variant="tonal" onClick={() => supabase.auth.signOut()} />}
      />

      <main className="flex-1 px-4 pt-2">
        <PageIntro
          size="display"
          title={firstName ? `Halo, ${firstName}! 👋` : 'Halo! 👋'}
          description="Yuk catat keuanganmu hari ini."
          className="pt-1"
        />
      </main>

      <BottomNav items={tabs} />
    </MobileShell>
  )
}
