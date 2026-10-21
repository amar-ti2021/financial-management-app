# DompetBijak — app

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

For now the app only routes the component catalog: `/` shows every component with its variants,
and any other URL redirects there. Links inside the catalog previews are inert.

The design screens are kept in `src/screens/` (and still type-checked) but are not routed.
To show one again, add its route in `src/App.tsx`:

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
