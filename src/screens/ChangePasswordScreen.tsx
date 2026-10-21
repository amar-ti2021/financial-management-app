import { useRef, useState, type FormEvent } from 'react'
import { Navigate } from 'react-router'
import { mustChangePassword, useAuth } from '@/auth/context'
import { authErrorMessage } from '@/auth/errors'
import { PASSWORD_MIN_LENGTH, passwordConfirmationError, passwordError } from '@/auth/validation'
import { PasswordField } from '@/components/form'
import { AuthLayout } from '@/components/layout'
import { Button, Callout } from '@/components/ui'
import { supabase } from '@/lib/supabase'

type Field = 'password' | 'confirmation'

/** First sign-in with a temporary password: the user sets their own before using the app. */
export function ChangePasswordScreen() {
  const { session, loading } = useAuth()
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmationRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  // The new password is stored; only reloading the session is left (retried if it failed).
  const [saved, setSaved] = useState(false)

  const clearError = (field: Field) => setErrors((current) => ({ ...current, [field]: undefined }))

  // The database clears the flag when the password changes, but updateUser returns the user
  // as it was before. Refreshing loads the new state, and this screen then redirects to the app.
  const finish = async () => {
    setFormError(null)
    setPending(true)
    const { data, error } = await supabase.auth.refreshSession()
    setPending(false)
    if (error) return setFormError(authErrorMessage(error))
    if (mustChangePassword(data.session)) {
      setFormError('Kata sandi sudah tersimpan, tapi akunmu masih ditandai memakai kata sandi sementara. Hubungi admin.')
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = {
      password: passwordError(password, { isNew: true }),
      confirmation: passwordConfirmationError(password, confirmation),
    }
    setErrors(found)
    setFormError(null)
    if (found.password) return passwordRef.current?.focus()
    if (found.confirmation) return confirmationRef.current?.focus()

    setPending(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setPending(false)
      setFormError(authErrorMessage(error))
      return
    }
    setSaved(true)
    await finish()
  }

  if (loading) return null
  if (!session) return <Navigate to="/masuk" replace />
  if (!mustChangePassword(session)) return <Navigate to="/" replace />

  const email = session.user.email ?? ''
  const signOut = (
    <p className="text-center text-body-md text-on-surface-variant">
      Bukan akunmu?{' '}
      <button type="button" onClick={() => supabase.auth.signOut()} className="font-bold text-primary hover:underline">
        Keluar
      </button>
    </p>
  )

  if (saved) {
    return (
      <AuthLayout title="Kata sandi tersimpan" description="Tinggal sedikit lagi untuk masuk ke aplikasi." footer={signOut}>
        {formError && (
          <Callout tone="danger" icon="error" role="alert">
            {formError}
          </Callout>
        )}
        <Button size="lg" fullWidth icon="arrow_forward" loading={pending} onClick={finish}>
          Lanjutkan
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Buat kata sandi baru"
      description={
        <>
          Akun <strong className="text-on-surface">{email}</strong> masih memakai kata sandi sementara. Ganti dulu
          sebelum melanjutkan.
        </>
      }
      footer={signOut}
    >
      {formError && (
        <Callout tone="danger" icon="error" role="alert">
          {formError}
        </Callout>
      )}

      <form noValidate onSubmit={submit} className="flex flex-col gap-4">
        {/* Lets password managers save the new password under the right account. */}
        <input type="email" autoComplete="username" value={email} readOnly hidden />
        <PasswordField
          ref={passwordRef}
          label="Kata sandi baru"
          autoComplete="new-password"
          helper={`Minimal ${PASSWORD_MIN_LENGTH} karakter. Gabungkan huruf dan angka agar lebih aman.`}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            clearError('password')
          }}
          error={errors.password}
        />
        <PasswordField
          ref={confirmationRef}
          label="Ulangi kata sandi baru"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => {
            setConfirmation(event.target.value)
            clearError('confirmation')
          }}
          error={errors.confirmation}
        />
        <Button type="submit" size="lg" fullWidth loading={pending}>
          Simpan kata sandi
        </Button>
      </form>
    </AuthLayout>
  )
}
