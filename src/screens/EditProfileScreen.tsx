import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '@/auth/context'
import { nameError, parsePhone, phoneError } from '@/auth/validation'
import { TextField } from '@/components/form'
import { MobileShell, StickyFooter, TaskHeader } from '@/components/layout'
import { Avatar, Button, Callout, Icon } from '@/components/ui'
import { useGoBack } from '@/hooks/useGoBack'
import { formatNumber, phoneToLocal } from '@/lib/format'
import type { Profile, ProfileUpdate } from '@/lib/supabase'
import { MAX_PHOTO_BYTES, prepareAvatar, removeAvatar, uploadAvatar } from '@/profile/avatar'
import { useProfile } from '@/profile/context'

/** Edit Profil: photo, name and phone. Waits for the profile so the form starts from saved values. */
export function EditProfileScreen() {
  const { profile, loadFailed, reload } = useProfile()
  const goBack = useGoBack('/profil')
  if (profile) return <EditProfileForm key={profile.id} profile={profile} onDone={goBack} />

  return (
    <MobileShell>
      <TaskHeader title="Edit Profil" onBack={goBack} />
      <main role="status" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        {loadFailed ? (
          <>
            <Callout tone="danger" icon="error">
              Profil belum bisa dimuat. Periksa koneksimu, lalu coba lagi.
            </Callout>
            <Button variant="outline" icon="refresh" onClick={reload}>
              Coba lagi
            </Button>
          </>
        ) : (
          <Icon name="progress_activity" size={40} className="animate-spin text-primary" />
        )}
      </main>
    </MobileShell>
  )
}

type Field = 'name' | 'phone'
// undefined: keep the saved photo; null: remove it; otherwise the newly picked, prepared photo.
type PhotoChange = { blob: Blob; url: string } | null | undefined

function EditProfileForm({ profile, onDone }: { profile: Profile; onDone: () => void }) {
  const { session } = useAuth()
  const { update } = useProfile()
  const fileRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(profile.full_name ?? '')
  const [phone, setPhone] = useState(profile.phone ? phoneToLocal(profile.phone) : '')
  const [photo, setPhoto] = useState<PhotoChange>(undefined)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState<'photo' | 'save' | null>(null)

  // Free the preview's object URL once it is replaced or the page closes.
  const previewUrl = photo?.url
  useEffect(() => {
    if (!previewUrl) return
    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const email = session?.user.email ?? ''
  const shownPhoto = photo === undefined ? profile.avatar_url : (photo?.url ?? null)

  const clearError = (field: Field) => setErrors((current) => ({ ...current, [field]: undefined }))

  const pickPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // Reset so picking the same file again still fires a change.
    event.target.value = ''
    if (!file) return
    setFormError(null)
    if (!file.type.startsWith('image/')) return setFormError('Pilih file foto, misalnya JPG atau PNG.')
    if (file.size > MAX_PHOTO_BYTES) {
      return setFormError(`Ukuran foto maksimal ${formatNumber(MAX_PHOTO_BYTES / 1024 / 1024)} MB.`)
    }
    setPending('photo')
    try {
      const blob = await prepareAvatar(file)
      setPhoto({ blob, url: URL.createObjectURL(blob) })
    } catch {
      setFormError('Foto ini tidak bisa dibuka. Coba foto lain.')
    } finally {
      setPending(null)
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = { name: nameError(name), phone: phoneError(phone) }
    setErrors(found)
    setFormError(null)
    if (found.name) return nameRef.current?.focus()
    if (found.phone) return phoneRef.current?.focus()

    setPending('save')
    const changes: ProfileUpdate = { full_name: name.trim(), phone: parsePhone(phone) ?? null }
    // The database requires a number for WhatsApp reminders, so clearing it turns them off.
    if (!changes.phone && profile.remind_via_whatsapp) changes.remind_via_whatsapp = false

    let uploaded: string | undefined
    if (photo) {
      try {
        uploaded = await uploadAvatar(profile.id, photo.blob)
      } catch {
        setPending(null)
        return setFormError('Foto belum bisa diunggah. Periksa koneksimu, lalu coba lagi.')
      }
      changes.avatar_url = uploaded
    } else if (photo === null) {
      changes.avatar_url = null
    }

    const error = await update(changes)
    if (error) {
      if (uploaded) await removeAvatar(uploaded)
      setPending(null)
      return setFormError('Profil belum tersimpan. Periksa koneksimu, lalu coba lagi.')
    }
    // The replaced photo is no longer shown anywhere. Wait for it, so leaving can't orphan the file.
    if (photo !== undefined && profile.avatar_url) await removeAvatar(profile.avatar_url)
    onDone()
  }

  return (
    <MobileShell>
      <TaskHeader title="Edit Profil" onBack={onDone} />

      <main className="flex-1 px-4 pt-2 pb-8">
        <form id="edit-profile" noValidate onSubmit={submit} className="space-y-6">
          {formError && (
            <Callout tone="danger" icon="error" role="alert">
              {formError}
            </Callout>
          )}

          <section aria-label="Foto profil" className="flex flex-col items-center gap-3">
            <Avatar name={name.trim() || email} src={shownPhoto ?? undefined} size="xl" />
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon="photo_camera"
                loading={pending === 'photo'}
                disabled={pending === 'save'}
                onClick={() => fileRef.current?.click()}
              >
                {shownPhoto ? 'Ganti foto' : 'Tambah foto'}
              </Button>
              {shownPhoto && (
                <Button variant="ghost" size="sm" icon="delete" disabled={pending !== null} onClick={() => setPhoto(null)}>
                  Hapus foto
                </Button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickPhoto} />
          </section>

          <TextField
            ref={nameRef}
            label="Nama lengkap"
            autoComplete="name"
            placeholder="Misal: Rian Pratama"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              clearError('name')
            }}
            error={errors.name}
          />
          <TextField
            ref={phoneRef}
            label="Nomor HP"
            hint="(Boleh dikosongkan)"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0812 3456 7890"
            helper={
              profile.remind_via_whatsapp
                ? 'Dipakai untuk pengingat WhatsApp. Mengosongkannya juga mematikan pengingat itu.'
                : 'Untuk pengingat jatuh tempo lewat WhatsApp.'
            }
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              clearError('phone')
            }}
            error={errors.phone}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            readOnly
            trailingIcon="lock"
            helper="Email dipakai untuk masuk dan belum bisa diganti."
          />
        </form>
      </main>

      <StickyFooter>
        <Button
          type="submit"
          form="edit-profile"
          size="lg"
          fullWidth
          icon="check_circle"
          iconFilled
          loading={pending === 'save'}
          disabled={pending === 'photo'}
        >
          Simpan Perubahan
        </Button>
      </StickyFooter>
    </MobileShell>
  )
}
