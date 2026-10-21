# Unbound - Financial Management App

React 19 + TypeScript + Vite + Tailwind CSS v4. Mobile-first (max 448px), Bahasa Indonesia UI.
Every component is hand-sliced from `../design-ref/` (HTML + `DESIGN.md`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run lint     # oxlint
```

## Structure

```
src/
  index.css            design tokens (@theme): colors, type scale, elevation
  components/
    ui/                generic primitives
    form/              inputs and selection controls
    layout/            shell, headers, bottom nav, sticky bars
    finance/           domain cards (balance, debt, loan, projection, profile)
  screens/             one file per design screen, composed only from components
    gallery/           specimens for the component catalog (/) — add an entry for every new component
  data/mock.ts         sample data from the designs
  lib/                 cn() (clsx + tailwind-merge), Rupiah/date formatting
```

Import from the folder barrels: `import { Button, Card } from '@/components/ui'`.

## Components

| Folder | Components |
| --- | --- |
| `ui` | Icon, Button, IconButton, Chip, ChipGroup, Badge, Card, IconTile, Avatar, Money, ProgressBar, SegmentBar, SegmentedControl, Switch, SectionHeader, PageIntro, Callout, FootNote, StatTile, MenuGroup, MenuItem, Toast |
| `form` | AmountInput, AmountField, OptionCard, OptionGroup, TextField, RangeField, DueDateField |
| `layout` | MobileShell, BrandHeader, TaskHeader, PageHeader, BottomNav, StickyFooter, FloatingActionBar |
| `finance` | BalanceCard, QuickActionButton, TransactionItem, DebtStatusCard, DebtOverviewCard, DebtCard, LoanSummaryCard, InstallmentList, RiskIndicator, LoanCostCard, SavingsCompareCard, ProjectionHeroCard, InsightCard, MonthProjectionCard, LoanPlanCard, ProfileCard, FinancialScoreCard |

## Routes

Every page needs a signed-in user except the auth screens (see [Auth](#auth)). For now the app
only routes the component catalog: `/` shows every component with its variants, and any other
URL redirects there. Links inside the catalog previews are inert.

The design screens are kept in `src/screens/` (and still type-checked) but are not routed.
To show one again, add its route in `src/App.tsx`, inside the `RequireAuth` group:

| Design | Screen file | Former route |
| --- | --- | --- |
| dompet_utama_beranda | `HomeScreen.tsx` | `/` |
| catat_pengeluaran_simpel | `ExpenseFormScreen.tsx` | `/catat/pengeluaran` |
| catat_pemasukan_simpel | `IncomeFormScreen.tsx` | `/catat/pemasukan` |
| catat_hutang_simpel | `DebtFormScreen.tsx` | `/catat/hutang` |
| daftar_ringkasan_hutang | `DebtListScreen.tsx` | `/pinjaman` |
| detail_hutang_jadwal_12x_cicilan_lengkap | `DebtDetailScreen.tsx` | `/pinjaman/:id` |
| kalkulator_pinjaman_simulasi_tabungan | `CalculatorScreen.tsx` | `/kalkulator` |
| matriks_arus_kas_jadwal_bayar_hutang | `ProjectionScreen.tsx` | `/proyeksi` |
| profil_pengaturan_akun | `ProfileScreen.tsx` | `/profil` |

The tab screens shared a bottom nav through a layout route; restore it with
`<><Outlet /><BottomNav items={tabs} /></>` around `/`, `/pinjaman`, `/kalkulator` and `/profil`.

## Supabase

The browser client lives in `src/lib/supabase.ts`: `import { supabase } from '@/lib/supabase'`.
It uses the publishable key, so every query runs under RLS as the signed-in user.

- **Env:** copy `.env.example` to `.env` and fill in the keys. Only `VITE_*` variables reach
  the browser bundle; `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` reference the
  plain values. Never give `SUPABASE_SECRET_KEY` a `VITE_` prefix.
- **Netlify:** set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Project
  configuration → Environment variables, since `.env` is not committed. Paste the actual URL
  and publishable key: `$VARIABLE` references only expand inside `.env` files. On Netlify,
  `vite.config.ts` fails the build if either is missing or malformed, or if any `VITE_`
  variable holds a secret key.
- **Types:** `src/lib/database.types.ts` is generated from the cloud schema. After each
  migration, regenerate it from the `database/` folder:
  `npx supabase gen types typescript --linked --schema public > ../app/src/lib/database.types.ts`

## Auth

| Route | Screen |
| --- | --- |
| `/masuk` | Sign in: Google, or email + password |
| `/daftar` | Sign up: Google, or name + email + password, then "Cek emailmu" |
| `/auth/callback` | Return point for Google and email confirmation links |
| `/ganti-kata-sandi` | Forced password change for accounts created with a temporary password |

`/masuk`, `/daftar` and `/auth/callback` are the only pages open to guests. Everything else sits
behind `RequireAuth`, which sends guests to `/masuk` and, once they sign in, back to the page
they asked for. The guards only hide the UI: data is protected by RLS in the database.

`src/auth/` holds the session context (`useAuth()`), the `RequireAuth`, `GuestOnly` and
`PasswordChangeGate` route guards, Indonesian error messages for Supabase error codes, and form validation. Sign-up
passes `full_name`, which the `on_auth_user_created` trigger copies into `public.profiles`.

### Roles and temporary passwords

- **Roles** live in `public.user_roles` (enum `app_role`, currently only `superadmin`). The app
  can read them but never write them; grant or revoke in the SQL editor:
  `insert into public.user_roles (user_id, role) select id, 'superadmin' from auth.users where email = '…';`
- **Superadmin** reads and edits every row of `public.profiles` (the same columns users may
  edit). RLS policies call `private.is_superadmin()`; give every new table with user data a
  "Superadmins can …" policy using `(select private.is_superadmin())`.
- **Temporary password:** create the account in Authentication → Users (or with the Admin API)
  with *Auto Confirm User*, then set `app_metadata.must_change_password = true` (Admin API:
  `app_metadata: { must_change_password: true }`). `PasswordChangeGate` keeps that account on
  `/ganti-kata-sandi` until it sets its own password. The `on_auth_user_password_changed`
  trigger removes the flag only when the password really changes, and superadmin rights stay
  off while the flag is set, so a leaked temporary password grants nothing extra.
- Use a random temporary password, never a guessable one: whoever signs in first with it
  can set the real password and take over the account.

Supabase dashboard settings the flows depend on:

- **Authentication → URL Configuration:** Site URL = the Netlify production URL. Redirect URLs:
  `http://localhost:5173/auth/callback`, `https://<site>.netlify.app/auth/callback` and, for
  deploy previews, `https://*--<site>.netlify.app/auth/callback`. A redirect that is not listed
  silently falls back to the Site URL.
- **Authentication → Sign In / Providers → Google:** Client ID *and* Client Secret from the
  Google Cloud OAuth client. In Google Cloud the authorized redirect URI is
  `https://<project-ref>.supabase.co/auth/v1/callback`.
- **Email confirmation** is on, so new email accounts must click the link before signing in.
  Supabase's built-in mailer only delivers to the project's team members and is heavily
  rate-limited; set up custom SMTP (Authentication → Emails → SMTP) before real users sign up.

## Deployment (Netlify)

The Netlify project is connected to this GitHub repo, so Netlify builds and deploys on its own:

| Event | GitHub Actions (`.github/workflows/ci.yml`) | Netlify |
| --- | --- | --- |
| Pull request | lint + build, gitleaks (PR commits), Trivy | deploy preview, linked on the PR |
| Push to `main` | lint + build, gitleaks (pushed commits), Trivy | production deploy |
| Weekly (Mon 01:00 UTC) | all checks, gitleaks over full history | — |

`netlify.toml` holds the build settings (`npm run lint && npm run build`, publish `dist`), the
SPA fallback and long-term caching for `/assets/*`. `.nvmrc` sets the Node version for both
GitHub Actions and Netlify. No secrets or tokens are needed.

Netlify checks to confirm once (Project configuration → Build & deploy → Continuous deployment):

- Build status is *Active* and the production branch is `main`.
- Deploy Previews are enabled for pull requests.
- Base directory is empty (the repo root is the app); `netlify.toml` overrides the UI build
  command and publish directory.

To block merging when checks fail, mark "Lint & build", "Secret scan (gitleaks)" and
"Vulnerability scan (Trivy)" as required in GitHub → Settings → Branches → branch protection
for `main`. Netlify deploys independently of these checks, so branch protection is what keeps
a failing PR out of `main`.

### Security scans

- **gitleaks** scans the commits a push or PR adds (the full history on manual and weekly
  runs) and fails on any secret. Output is redacted because the repo is public. If a secret
  was committed, revoke it first; removing it from the code is not enough. For a confirmed
  false positive, add its fingerprint (printed in the log) to `.gitleaksignore`.
- **Trivy** scans `package-lock.json` (dev dependencies included), secrets and config files.
  It fails on HIGH/CRITICAL findings that already have a fix. Usually `npm update` or a
  version bump resolves it; to accept a risk, add the CVE ID to `.trivyignore` with a comment.
- Both run as official release binaries pinned by version and SHA-256 in `ci.yml`, not as
  third-party actions. To upgrade, change the version and copy the new hash from the
  release's `*_checksums.txt`.

## Design notes

- Colors follow the emerald palette used by every screen's HTML, not the blue values written in `DESIGN.md`.
- Icons are Material Symbols throughout; the cash-flow screen's Remix icons were mapped to their Material equivalents.
- Fonts (Plus Jakarta Sans, Material Symbols) load from Google Fonts in `index.html`.
