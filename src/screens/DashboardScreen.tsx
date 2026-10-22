import { useState } from 'react'
import { useAuth } from '@/auth/context'
import { BottomNav, BrandHeader, MobileShell } from '@/components/layout'
import { IconButton, PageIntro, Toast } from '@/components/ui'
import { useProfile } from '@/profile/context'
import { mainTabs } from './mainTabs'

/** Beranda. For now only the app bar and the greeting; the cards follow with their features. */
export function DashboardScreen() {
  const { session } = useAuth()
  const { name, avatarUrl } = useProfile()
  const [toast, setToast] = useState<string | null>(null)
  // RequireAuth only renders this page with a session.
  if (!session) return null

  const firstName = name?.trim().split(/\s+/)[0]

  return (
    <MobileShell bottomInset="nav">
      <BrandHeader
        userName={name ?? session.user.email ?? 'Akun'}
        avatarSrc={avatarUrl}
        profileTo="/profil"
        action={
          <IconButton
            icon="notifications"
            label="Notifikasi"
            variant="tonal"
            onClick={() => setToast('Notifikasi segera hadir.')}
          />
        }
      />

      <main className="flex-1 px-4 pt-2">
        <PageIntro
          size="display"
          title={firstName ? `Halo, ${firstName}! 👋` : 'Halo! 👋'}
          description="Yuk catat keuanganmu hari ini."
          className="pt-1"
        />
      </main>

      <BottomNav items={mainTabs('Beranda')} />
      <Toast message={toast} onDismiss={() => setToast(null)} icon="schedule" />
    </MobileShell>
  )
}
