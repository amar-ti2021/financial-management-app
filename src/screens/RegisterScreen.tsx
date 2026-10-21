import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { authCallbackUrl, signInWithGoogle } from '@/auth/actions'
import { authErrorMessage, EMAIL_TAKEN_MESSAGE } from '@/auth/errors'
import { emailError, nameError, PASSWORD_MIN_LENGTH, passwordError } from '@/auth/validation'
import { PasswordField, TextField } from '@/components/form'
import { AuthLayout } from '@/components/layout'
import { Button, Callout, Divider, GoogleButton, Toast } from '@/components/ui'
import { supabase } from '@/lib/supabase'

type Field = 'name' | 'email' | 'password'

const toLogin = (
  <p className="text-center text-body-md text-on-surface-variant">
    Sudah punya akun?{' '}
    <Link to="/masuk" className="font-bold text-primary hover:underline">
      Masuk
    </Link>
  </p>
)

export function RegisterScreen() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState<'password' | 'google' | 'resend' | null>(null)
  // Set once the confirmation email is on its way; switches the screen to "Cek emailmu".
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const clearError = (field: Field) => setErrors((current) => ({ ...current, [field]: undefined }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = { name: nameError(name), email: emailError(email), password: passwordError(password, { isNew: true }) }
    setErrors(found)
    setFormError(null)
    if (found.name) return nameRef.current?.focus()
    if (found.email) return emailRef.current?.focus()
    if (found.password) return passwordRef.current?.focus()

    setPending('password')
    const address = email.trim()
    const { data, error } = await supabase.auth.signUp({
      email: address,
      password,
      // full_name prefills public.profiles through the on_auth_user_created trigger.
      options: { data: { full_name: name.trim() }, emailRedirectTo: authCallbackUrl() },
    })
    setPending(null)

    if (error) return setFormError(authErrorMessage(error))
    // Signed in at once (email confirmation off): GuestOnly moves on to the app.
    if (data.session) return
    // With email confirmation on, Supabase hides existing accounts by returning a user with no identities.
    if (data.user?.identities?.length === 0) return setFormError(EMAIL_TAKEN_MESSAGE)
    setSentTo(address)
  }

  const continueWithGoogle = async () => {
    setFormError(null)
    setPending('google')
    const error = await signInWithGoogle()
    if (error) {
      setPending(null)
      setFormError(authErrorMessage(error))
    }
  }

  const resend = async () => {
    if (!sentTo) return
    setFormError(null)
    setPending('resend')
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: sentTo,
      options: { emailRedirectTo: authCallbackUrl() },
    })
    setPending(null)
    if (error) setFormError(authErrorMessage(error))
    else setToast('Email konfirmasi sudah dikirim ulang.')
  }

  if (sentTo) {
    return (
      <AuthLayout
        title="Cek emailmu"
        description={
          <>
            Kami mengirim tautan konfirmasi ke <strong className="text-on-surface">{sentTo}</strong>. Buka tautan itu
            untuk mengaktifkan akunmu.
          </>
        }
        footer={toLogin}
      >
        {formError && (
          <Callout tone="danger" icon="error" role="alert">
            {formError}
          </Callout>
        )}
        <Callout tone="info" icon="mark_email_unread" iconStyle="tile" title="Belum menerima email?">
          Periksa folder Spam atau Promosi. Pastikan alamat emailnya sudah benar.
        </Callout>
        <Button variant="outline" size="lg" fullWidth icon="forward_to_inbox" loading={pending === 'resend'} onClick={resend}>
          Kirim ulang email
        </Button>
        <Button variant="ghost" onClick={() => setSentTo(null)} className="self-center">
          Ganti alamat email
        </Button>
        <Toast message={toast} onDismiss={() => setToast(null)} icon="mark_email_read" />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Buat akun baru"
      description="Mulai catat keuangan dan bebas dari jerat pinjol."
      footer={toLogin}
    >
      {formError && (
        <Callout tone="danger" icon="error" role="alert">
          {formError}
        </Callout>
      )}

      <GoogleButton onClick={continueWithGoogle} loading={pending === 'google'} disabled={pending !== null}>
        Daftar dengan Google
      </GoogleButton>

      <Divider label="atau daftar dengan email" />

      <form noValidate onSubmit={submit} className="flex flex-col gap-4">
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
          ref={emailRef}
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          placeholder="nama@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            clearError('email')
          }}
          error={errors.email}
        />
        <PasswordField
          ref={passwordRef}
          label="Kata sandi"
          autoComplete="new-password"
          helper={`Minimal ${PASSWORD_MIN_LENGTH} karakter. Gabungkan huruf dan angka agar lebih aman.`}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            clearError('password')
          }}
          error={errors.password}
        />
        <Button type="submit" size="lg" fullWidth loading={pending === 'password'} disabled={pending !== null}>
          Daftar
        </Button>
      </form>
    </AuthLayout>
  )
}
