import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/auth/context'
import { TextField } from '@/components/form'
import { MobileShell, PageHeader } from '@/components/layout'
import { Avatar, Badge, Button, ChipGroup, IconButton, SectionHeader } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import { SpecimenCard } from './gallery/Specimen'
import { groups, specimens, type GroupKey } from './gallery/specimens'

/** Header slot: "Masuk" for guests, avatar + sign-out once signed in. */
function AccountAction() {
  const navigate = useNavigate()
  const { session, loading } = useAuth()
  if (loading) return null

  if (!session) {
    return (
      <Button size="sm" variant="secondary" icon="login" onClick={() => navigate('/masuk')}>
        Masuk
      </Button>
    )
  }

  // Google fills name / avatar_url; email sign-up fills full_name.
  const meta = session.user.user_metadata
  const name: string = meta.full_name ?? meta.name ?? session.user.email ?? 'Akun'
  return (
    <div className="flex items-center gap-1" title={name}>
      <Avatar name={name} src={meta.avatar_url ?? meta.picture} />
      <IconButton icon="logout" label="Keluar" onClick={() => supabase.auth.signOut()} />
    </div>
  )
}

/** Living catalog of every reusable component, rendered with its variants. */
export function ComponentGalleryScreen() {
  const [group, setGroup] = useState<GroupKey | 'all'>('all')
  const [query, setQuery] = useState('')

  const needle = query.trim().toLowerCase()
  const visible = specimens.filter(
    (specimen) =>
      (group === 'all' || specimen.group === group) &&
      (!needle ||
        specimen.name.toLowerCase().includes(needle) ||
        specimen.description.toLowerCase().includes(needle)),
  )

  return (
    <MobileShell>
      <PageHeader
        title="Katalog Komponen"
        subtitle={`${specimens.length} komponen reusable dari design-ref`}
        onBack={false}
        actions={<AccountAction />}
      >
        <ChipGroup
          label="Kelompok komponen"
          size="sm"
          value={group}
          onChange={setGroup}
          options={[
            { value: 'all', label: `Semua (${specimens.length})` },
            ...groups.map((item) => ({
              value: item.key,
              label: `${item.label} (${specimens.filter((specimen) => specimen.group === item.key).length})`,
            })),
          ]}
        />
      </PageHeader>

      <main className="flex-1 space-y-10 px-4 pt-4 pb-16">
        <TextField
          label="Cari komponen"
          type="search"
          trailingIcon="search"
          placeholder="Misal: Button, Debt, Chip…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {groups.map((item) => {
          const items = visible.filter((specimen) => specimen.group === item.key)
          if (items.length === 0) return null
          return (
            <section key={item.key} className="space-y-8">
              <div className="space-y-1 border-b border-outline-variant/40 pb-3">
                <SectionHeader
                  title={item.label}
                  subtitle={<code className="font-mono">{item.path}</code>}
                  size="lg"
                  aside={
                    <Badge tone="success" size="md">
                      {items.length} komponen
                    </Badge>
                  }
                />
                <p className="text-body-sm text-on-surface-variant">{item.description}</p>
              </div>
              {items.map((specimen) => (
                <SpecimenCard key={specimen.name} name={specimen.name} description={specimen.description}>
                  {specimen.demo}
                </SpecimenCard>
              ))}
            </section>
          )
        })}

        {visible.length === 0 && (
          <p className="rounded-xl border border-dashed border-outline-variant p-6 text-center text-body-sm text-on-surface-variant">
            Tidak ada komponen yang cocok dengan “{query}”.
          </p>
        )}
      </main>
    </MobileShell>
  )
}
