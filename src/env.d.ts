// Env variables the app reads at build time. Only VITE_* reach the browser bundle.
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL?: string
    readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  }

  /** `version` from package.json, injected by vite.config.ts. */
  const __APP_VERSION__: string
}

export {}
