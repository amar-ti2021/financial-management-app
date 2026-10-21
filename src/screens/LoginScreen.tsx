import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { signInWithGoogle } from '@/auth/actions'
import { authErrorMessage } from '@/auth/errors'
import { emailError, passwordError } from '@/auth/validation'
import { PasswordField, TextField } from '@/components/form'
import { AuthLayout } from '@/components/layout'
import { Button, Callout, Divider, FootNote, GoogleButton } from '@/components/ui'
import { supabase } from '@/lib/supabase'

type Field = 'email' | 'password'

export function LoginScreen() {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState<'password' | 'google' | null>(null)

  const clearError = (field: Field) => setErrors((current) => ({ ...current, [field]: undefined }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = { email: emailError(email), password: passwordError(password) }
    setErrors(found)
    setFormError(null)
    if (found.email) return emailRef.current?.focus()
    if (found.password) return passwordRef.current?.focus()

    setPending('password')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      setPending(null)
      setFormError(authErrorMessage(error))
      return
    }
    navigate('/', { replace: true })
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

  return (
    <AuthLayout
      title="Masuk ke akunmu"
      description="Pantau keuangan dan jadwal cicilanmu dengan tenang."
      footer={
        <p className="text-center text-body-md text-on-surface-variant">
          Belum punya akun?{' '}
          <Link to="/daftar" className="font-bold text-primary hover:underline">
            Daftar sekarang
          </Link>
        </p>
      }
    >
      {formError && (
        <Callout tone="danger" icon="error" role="alert">
          {formError}
        </Callout>
      )}

      <GoogleButton onClick={continueWithGoogle} loading={pending === 'google'} disabled={pending !== null} />

      <Divider label="atau masuk dengan email" />

      <form noValidate onSubmit={submit} className="flex flex-col gap-4">
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
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            clearError('password')
          }}
          error={errors.password}
        />
        <Button type="submit" size="lg" fullWidth loading={pending === 'password'} disabled={pending !== null}>
          Masuk
        </Button>
      </form>

      <FootNote icon="shield">Jangan bagikan kata sandimu ke siapa pun, termasuk yang mengaku petugas Unbound.</FootNote>
    </AuthLayout>
  )
}
