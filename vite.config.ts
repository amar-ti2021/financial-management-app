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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  assertNoSupabaseSecrets(loadEnv(mode, process.cwd(), 'VITE_'))
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
