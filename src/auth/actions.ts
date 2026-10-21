import { supabase } from '@/lib/supabase'

/**
 * Where Supabase sends users back after Google sign-in or an email confirmation link.
 * Must be listed under Authentication → URL Configuration → Redirect URLs.
 */
export function authCallbackUrl() {
  return `${window.location.origin}/auth/callback`
}

/** Leaves the app for Google's consent screen; resolves only if starting the flow failed. */
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: authCallbackUrl() },
  })
  return error
}
