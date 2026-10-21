import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

function isHttpUrl(value: string) {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

// Fail loudly at startup rather than with opaque errors later. vite.config.ts runs the
// same check at build time on Netlify, so this mainly guards local and other builds.
if (!url || !publishableKey || !isHttpUrl(url)) {
  throw new Error(
    'Supabase is not configured: VITE_SUPABASE_URL must be the project URL (https://<ref>.supabase.co) ' +
      'and VITE_SUPABASE_PUBLISHABLE_KEY the publishable key. Copy .env.example to .env locally; ' +
      'on Netlify paste the actual values (not $VARIABLE references) in the environment variables.',
  )
}

/**
 * Browser client, typed from the database schema (`src/lib/database.types.ts`).
 * Uses the publishable key, so every query runs under RLS as the signed-in user.
 * The session is kept in localStorage and refreshed automatically.
 */
export const supabase = createClient<Database>(url, publishableKey)

export type Profile = Database['public']['Tables']['profiles']['Row']
/** Columns a user may change on their own profile (the migration grants UPDATE on these only). */
export type ProfileUpdate = Omit<
  Database['public']['Tables']['profiles']['Update'],
  'id' | 'created_at' | 'updated_at'
>
