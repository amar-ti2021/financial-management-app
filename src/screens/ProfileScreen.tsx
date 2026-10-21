import { useState } from 'react'
import { useAuth } from '@/auth/context'
import { FinancialScoreCard, ProfileCard } from '@/components/finance'
import { BottomNav, MobileShell, PageHeader } from '@/components/layout'
import { Badge, Icon, IconButton, MenuGroup, MenuItem, StatTile, Switch, Toast } from '@/components/ui'
import { useProfile } from '@/hooks/useProfile'
import { formatMonthYear, formatRupiah, maskPhone } from '@/lib/format'
import { supabase } from '@/lib/supabase'
import { mainTabs } from './mainTabs'

// Not tracked yet: zero until the features that produce them exist.
const financialScore = 0
const interestSaved = 0
const activeSavingGoals = 0
const savingDiscipline = 0

/** "Notifikasi App & WhatsApp", from the reminder channels the user picked. */
function reminderChannels(app: boolean, whatsapp: boolean) {
  const channels = [app && 'App', whatsapp && 'WhatsApp'].filter(Boolean)
  return channels.length > 0 ? `Notifikasi ${channels.join(' & ')}` : 'Nonaktif'
}

/**
 * Profil & pengaturan akun. Shows what the profile row and session hold; anything the app
 * doesn't track yet is a placeholder (numbers are 0), and rows without a page say "segera hadir".
 */
export function ProfileScreen() {
  const { session } = useAuth()
  const { profile, name, avatarUrl } = useProfile()
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null)
  // The switch's value while a change is saved (or after it was); the profile row until then.
  const [hideBalance, setHideBalance] = useState<boolean | null>(null)
  // RequireAuth only renders this page with a session.
  if (!session) return null

  const comingSoon = () => setToast({ message: 'Fitur ini segera hadir.', icon: 'schedule' })

  const privacyMode = hideBalance ?? profile?.hide_balance ?? false
  const setPrivacyMode = async (next: boolean) => {
    setHideBalance(next)
    const { error } = await supabase.from('profiles').update({ hide_balance: next }).eq('id', session.user.id)
    if (error) {
      setHideBalance(!next)
      setToast({ message: 'Pengaturan belum tersimpan. Coba lagi.', icon: 'error' })
    }
  }

  const memberSince = formatMonthYear(new Date(profile?.created_at ?? session.user.created_at))

  return (
    <MobileShell bottomInset="nav">
      <PageHeader
        title="Profil Saya"
        actions={<IconButton icon="settings" label="Pengaturan" onClick={comingSoon} />}
        className="bg-surface/90 shadow-none"
      />

      <main className="flex-1 space-y-5 px-5 pt-2 pb-6">
        <ProfileCard
          name={name ?? session.user.email ?? 'Akun'}
          avatarSrc={avatarUrl}
          verified={!!session.user.email_confirmed_at}
          tagline={`Generasi Bebas Pinjol • ${memberSince}`}
          email={session.user.email ?? ''}
          phone={profile?.phone ? maskPhone(profile.phone) : 'No. HP belum diisi'}
          onEdit={comingSoon}
        />

        <FinancialScoreCard score={financialScore} statusLabel="Belum Dinilai" onInfo={comingSoon}>
          <StatTile
            variant="tonal"
            size="lg"
            label="Bebas Bunga Saved"
            value={formatRupiah(interestSaved)}
            valueClassName="text-primary"
            footer={
              <span className="flex items-center gap-0.5 text-on-surface-variant">
                <Icon name="trending_flat" size={14} /> Belum ada data
              </span>
            }
          />
          <StatTile
            variant="tonal"
            size="lg"
            label="Target Tabungan"
            value={`${activeSavingGoals} Pos Aktif`}
            footer={
              <span className="flex items-center gap-0.5 text-on-surface-variant">
                <Icon name="check_circle" size={14} /> Disiplin {savingDiscipline}%
              </span>
            }
          />
        </FinancialScoreCard>

        <div className="space-y-4">
          <MenuGroup title="Keamanan & Privasi">
            <MenuItem
              icon="fingerprint"
              title="Kunci Keamanan & Biometrik"
              description={'PIN, Sidik Jari & Face ID'}
              trailing={
                <Badge tone="neutral" size="md" className="font-bold">
                  Nonaktif
                </Badge>
              }
              onClick={comingSoon}
            />
            <MenuItem
              icon="notifications_active"
              title="Peringatan Jatuh Tempo"
              description={reminderChannels(profile?.remind_via_app ?? true, profile?.remind_via_whatsapp ?? false)}
              onClick={comingSoon}
            />
            <MenuItem
              icon="visibility_off"
              title="Mode Privasi Saldo"
              description="Sembunyikan nominal di layar"
              trailing={
                <Switch
                  checked={privacyMode}
                  onChange={setPrivacyMode}
                  label="Mode Privasi Saldo"
                  disabled={!profile}
                />
              }
            />
          </MenuGroup>

          <MenuGroup title="Preferensi & Edukasi">
            <MenuItem
              icon="category"
              title="Kategori Anggaran Favorit"
              description="Belum ada kategori favorit"
              onClick={comingSoon}
            />
            <MenuItem
              icon="balance"
              title="Batas Rasio Beban Hutang"
              description="Batas aman konsumtif"
              trailing={
                <span className="text-label-md font-bold text-primary">Maks {profile?.debt_ratio_limit ?? 30}%</span>
              }
              onClick={comingSoon}
            />
            <MenuItem
              icon="menu_book"
              title="Pusat Bantuan & Edukasi OJK"
              description="Cek legalitas pinjol & literasi"
              onClick={comingSoon}
            />
          </MenuGroup>

          <MenuGroup title="Lainnya">
            <MenuItem icon="info" title="Tentang Unbound" description={`Versi ${__APP_VERSION__}`} onClick={comingSoon} />
            <MenuItem
              icon="logout"
              title="Keluar dari Akun"
              description="Sesi perangkat ini akan diakhiri"
              tone="danger"
              onClick={() => supabase.auth.signOut({ scope: 'local' })}
            />
          </MenuGroup>
        </div>

        <p className="pt-2 pb-4 text-center text-label-sm text-outline-variant">
          Unbound Financial Guard • Dilindungi Enkripsi 256-bit
        </p>
      </main>

      <BottomNav items={mainTabs()} />
      <Toast message={toast?.message ?? null} onDismiss={() => setToast(null)} icon={toast?.icon} />
    </MobileShell>
  )
}
