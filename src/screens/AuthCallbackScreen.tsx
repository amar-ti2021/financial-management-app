import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { callbackErrorMessage } from '@/auth/errors'
import { AuthLayout, MobileShell } from '@/components/layout'
import { Button, Icon } from '@/components/ui'
import { supabase } from '@/lib/supabase'

/** Landing page for Google sign-in and email confirmation links. */
export function AuthCallbackScreen() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    // Resolves once the client has read the session (or an error) from the redirect URL.
    supabase.auth.initialize().then(async ({ error: urlError }) => {
      if (!active) return
      if (urlError) return setError(callbackErrorMessage(urlError))
      const { data } = await supabase.auth.getSession()
      if (!active) return
      if (data.session) navigate('/', { replace: true })
      else setError('Tautan ini tidak valid atau sudah dipakai. Silakan masuk.')
    })
    return () => {
      active = false
    }
  }, [navigate])

  if (!error) {
    return (
      <MobileShell>
        <main role="status" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <Icon name="progress_activity" size={40} className="animate-spin text-primary" />
          <p className="text-body-md text-on-surface-variant">Menyambungkan akunmu…</p>
        </main>
      </MobileShell>
    )
  }

  return (
    <AuthLayout title="Belum berhasil masuk" description={error}>
      <Button size="lg" fullWidth icon="login" onClick={() => navigate('/masuk', { replace: true })}>
        Ke halaman Masuk
      </Button>
    </AuthLayout>
  )
}
