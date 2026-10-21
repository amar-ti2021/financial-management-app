import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Fail loudly at startup rather than with opaque 401s later.
if (!url || !publishableKey) {
  throw new Error(
    'Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY ' +
      '(copy .env.example to .env locally; set them in Netlify environment variables for deploys).',
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
