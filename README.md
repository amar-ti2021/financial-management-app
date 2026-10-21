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

`.github/workflows/deploy.yml` runs on GitHub Actions:

| Event | Lint + build | Deploy |
| --- | --- | --- |
| Pull request (from this repo) | yes | preview at `pr-<number>--<site>.netlify.app` |
| Push to `main` | yes | production |
| Manual run (`workflow_dispatch`) | yes | production when run on `main` |

The deploy URL appears on the PR as a "View deployment" link and in the run summary.
`netlify.toml` adds the SPA fallback and long-term caching for `/assets/*`. `.nvmrc` sets the
Node version for both CI and Netlify.

One-time setup:

1. In Netlify, create a project **without** connecting the Git repo (Add new project → Deploy
   manually), or run `npx netlify-cli sites:create`. If the repo is already linked, set builds to
   *Stopped*, otherwise every push deploys twice.
2. Copy the **Project ID** (Project configuration → General → Project details).
3. Create a personal access token (User settings → Applications → Personal access tokens).
4. In GitHub → Settings → Secrets and variables → Actions, add the repository secrets
   `NETLIFY_SITE_ID` and `NETLIFY_AUTH_TOKEN`.

The `production` environment is created automatically on the first deploy; add required
reviewers to it in GitHub → Settings → Environments if production deploys need approval.

## Design notes

- Colors follow the emerald palette used by every screen's HTML, not the blue values written in `DESIGN.md`.
- Icons are Material Symbols throughout; the cash-flow screen's Remix icons were mapped to their Material equivalents.
- Fonts (Plus Jakarta Sans, Material Symbols) load from Google Fonts in `index.html`.
