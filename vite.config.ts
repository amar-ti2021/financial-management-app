import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

/** `role` claim of a legacy Supabase JWT key, if `value` is one. */
function jwtRole(value: string) {
  const parts = value.split('.')
  if (parts.length !== 3) return undefined
  try {
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString()).role as string | undefined
  } catch {
    return undefined
  }
}

// Every VITE_* variable is inlined into the public bundle. Refuse to build if one holds a
// Supabase secret key (sb_secret_… or a legacy service_role JWT), whether it comes from
// .env or from the Netlify environment. This is what makes it safe for netlify.toml to
// exclude the publishable key from Netlify's secret scanning.
function assertNoSupabaseSecrets(env: Record<string, string>) {
  for (const [name, value] of Object.entries(env)) {
    if (value.startsWith('sb_secret_') || jwtRole(value) === 'service_role') {
      throw new Error(
        `${name} contains a Supabase secret key, which would be published to every visitor. ` +
          'Use the publishable key (sb_publishable_…) instead, and rotate the secret key.',
      )
    }
  }
}

function isHttpUrl(value: string) {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

// The app cannot start without these, so a deploy with a missing or malformed value is a
// blank page. Netlify passes dashboard values through verbatim (only .env files expand
// `$VAR` references), so a copied `$SUPABASE_URL` arrives literally. Required on Netlify;
// GitHub Actions CI builds without Supabase settings, so there they are only checked if set.
function assertSupabaseConfig(env: Record<string, string>, { required }: { required: boolean }) {
  const url = env.VITE_SUPABASE_URL
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!required && !url && !key) return

  const problems: string[] = []
  if (!url) problems.push('VITE_SUPABASE_URL is not set.')
  else if (!isHttpUrl(url) || url.includes('$'))
    problems.push(`VITE_SUPABASE_URL must be the project URL, e.g. https://<ref>.supabase.co (got "${url}").`)
  if (!key) problems.push('VITE_SUPABASE_PUBLISHABLE_KEY is not set.')
  else if (!key.startsWith('sb_publishable_') && jwtRole(key) !== 'anon')
    problems.push('VITE_SUPABASE_PUBLISHABLE_KEY must be the publishable key (sb_publishable_…).')

  if (problems.length > 0) {
    throw new Error(
      `Supabase settings are invalid:\n  - ${problems.join('\n  - ')}\n` +
        'Paste the actual values (not $VARIABLE references) in Netlify → Project configuration → Environment variables.',
    )
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  assertNoSupabaseSecrets(env)
  // Netlify sets NETLIFY=true in its build environment.
  assertSupabaseConfig(env, { required: process.env.NETLIFY === 'true' })
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
