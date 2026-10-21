/**
 * Sample data lifted from the design-ref screens. Swap for real storage/API later.
 */
import type { Option } from '@/components/form'
import type {
  DebtCardProps,
  Installment,
  LoanPlanCardProps,
  MonthProjectionCardProps,
  TransactionItemProps,
} from '@/components/finance'

/** The designs are dated mid-November 2024; countdowns are computed from this day. */
export const TODAY = new Date(2024, 10, 13)

export const user = {
  name: 'Rian Pratama',
  firstName: 'Rian',
  email: 'rian.pratama@email.com',
  phone: '0812-****-8890',
  tagline: 'Generasi Bebas Pinjol • Jan 2024',
  verified: true,
}

export const wallet = {
  balance: 3_450_000,
  income: 4_200_000,
  expense: 750_000,
}

export const recentTransactions: (TransactionItemProps & { id: string })[] = [
  { id: 't1', title: 'Makan Siang', meta: 'Hari ini • Tunai', amount: -35_000, icon: 'restaurant' },
  { id: 't2', title: 'Kiriman Uang', meta: 'Kemarin • BCA', amount: 1_000_000, icon: 'account_balance_wallet' },
]

/* ---------- Catat forms ---------- */

export const expenseCategories: Option<string>[] = [
  { value: 'food', icon: 'restaurant', title: 'Makanan & Minuman', description: 'Makan harian / jajan' },
  { value: 'groceries', icon: 'shopping_basket', title: 'Belanja Harian', description: 'Kebutuhan pokok / warung' },
  { value: 'transport', icon: 'commute', title: 'Transportasi', description: 'Bensin, angkot, ojol' },
  { value: 'bills', icon: 'receipt_long', title: 'Tagihan & Pulsa', description: 'Listrik, paket data' },
]

export const incomeCategories: Option<string>[] = [
  { value: 'salary', icon: 'account_balance_wallet', title: 'Gaji / Upah', description: 'Uang kerja / harian' },
  { value: 'allowance', icon: 'volunteer_activism', title: 'Uang Saku', description: 'Dari orang tua / kerabat' },
  { value: 'sales', icon: 'storefront', title: 'Hasil Jualan', description: 'Dagang / usaha' },
  { value: 'other', icon: 'featured_seasonal_and_gifts', title: 'Lainnya', description: 'Bonus, THR, kiriman' },
]

export const paymentSources: Option<string>[] = [
  { value: 'cash', icon: 'payments', title: 'Kas Tunai', description: 'Dompet fisik' },
  { value: 'bank', icon: 'account_balance_wallet', title: 'Bank / E-Wallet', description: 'BCA, GoPay, QRIS' },
]

export const lenders: Option<string>[] = [
  {
    value: 'family',
    icon: 'group',
    title: 'Keluarga / Teman',
    description: 'Bebas bunga & denda',
    descriptionTone: 'primary',
  },
  { value: 'bank', icon: 'account_balance', title: 'Bank Resmi', description: 'Cicilan & bunga jelas' },
  { value: 'pinjol', icon: 'verified_user', title: 'Pinjol Legal OJK', description: 'Perhatikan tanggal tempo' },
  {
    value: 'other',
    icon: 'warning',
    title: 'Lainnya',
    description: 'Waspada bunga tinggi',
    iconTone: 'danger',
    descriptionTone: 'danger',
  },
]

/* ---------- Pinjaman ---------- */

export type Debt = Omit<DebtCardProps, 'plan' | 'onClick'> & {
  id: string
  plan: string
  /** Bold part after the plan, e.g. "(Rp 275.000/bln)". */
  planAmount: string
  dueSoon: boolean
  paid: boolean
}

export const debtOverview = {
  total: 4_500_000,
  summary: '3 Pinjaman Aktif • Jatuh tempo terdekat dalam 5 hari',
  statusLabel: 'Status: Terkendali (Aman)',
  ratioLabel: 'Rasio 22%',
}

export const debts: Debt[] = [
  {
    id: 'pinjol-ojk',
    name: 'Pinjol Legal OJK',
    provider: 'Kredivo / Akulaku',
    icon: 'verified_user',
    badge: { label: 'Mendekati Jatuh Tempo', tone: 'warning', icon: 'schedule' },
    remainingLabel: 'Sisa Hutang Pokok',
    remaining: 1_500_000,
    plan: 'Cicilan ke-2 dari 6x',
    planAmount: '(Rp 275.000/bln)',
    dueDate: '18 Nov 2024',
    dueNote: '5 hari lagi',
    actionLabel: 'Bayar Sekarang',
    urgent: true,
    dueSoon: true,
    paid: false,
  },
  {
    id: 'bri',
    name: 'Pinjaman Bank BRI',
    provider: 'Kredit Usaha Mikro',
    icon: 'account_balance',
    iconTone: 'info',
    badge: { label: 'Lancar', tone: 'success' },
    remainingLabel: 'Sisa Hutang (dari Rp 3.000.000)',
    remaining: 2_400_000,
    plan: 'Cicilan ke-4 dari 12x',
    planAmount: '(Rp 250.000/bln)',
    dueDate: '25 Nov 2024',
    dueNote: '12 hari lagi',
    actionLabel: 'Rincian',
    dueSoon: false,
    paid: false,
  },
  {
    id: 'saudara',
    name: 'Pinjam Saudara',
    provider: 'Paman Budi • Non-Fintech',
    icon: 'group',
    iconTone: 'success',
    badge: { label: 'Kekeluargaan', tone: 'neutral' },
    remainingLabel: 'Sisa Hutang Pokok',
    remaining: 600_000,
    plan: 'Bebas bunga • 2x bayar',
    planAmount: '(Rp 300.000)',
    dueDate: '30 Des 2024',
    dueNote: 'Bulan Depan',
    actionLabel: 'Catat Bayar',
    dueSoon: false,
    paid: false,
  },
]

const briInstallment = 250_000

export const loanDetails: Record<
  string,
  {
    lender: string
    icon: string
    registeredLabel: string
    statusLabel: string
    remaining: number
    ceiling: number
    interestLabel: string
    installmentAmount: number
    tenorLabel: string
    tenorNote: string
    paymentMethod: string
    purpose: string
    tip: string
    installments: Installment[]
  }
> = {
  bri: {
    lender: 'Bank BRI (Kredit Mikro)',
    icon: 'account_balance',
    registeredLabel: 'Terdaftar OJK',
    statusLabel: 'Aktif',
    remaining: 2_400_000,
    ceiling: 3_000_000,
    interestLabel: 'Bunga 0.8% flat',
    installmentAmount: briInstallment,
    tenorLabel: '12 Bulan',
    tenorNote: '(1 Thn)',
    paymentMethod: 'Auto-debet BRI',
    purpose: 'Modal Usaha',
    tip: 'Pastikan saldo auto-debet BRI Anda minimal Rp 250.000 sebelum tanggal 24 setiap bulannya untuk menghindari denda keterlambatan.',
    installments: Array.from({ length: 12 }, (_, index) => ({
      number: index + 1,
      dueDate: new Date(2024, 7 + index, 25),
      amount: briInstallment,
      status: index < 3 ? 'paid' : index === 3 ? 'due' : 'upcoming',
    })),
  },
}

/* ---------- Proyeksi arus kas ---------- */

export const projection = {
  activeLabel: '13 Pos Pinjaman Aktif',
  periodLabel: 'Periode Okt - Sep',
  total: 23_137_000,
  footnote: 'Berdasarkan cell P17 sheet Keuangan',
  lowest: { label: 'Uang Free Terendah', month: 'Nov', amount: 233_000, note: 'Beban puncak (Rp 4.26 jt)' },
  peak: { label: 'Uang Free Puncak', month: 'Sep', amount: 3_680_000, note: 'Cicilan sisa Rp 820 rb!' },
}

export const projectionPhases = [
  { value: 30, colorClassName: 'bg-rose-400', label: 'Okt-Jan (Fase Kritis)', caption: 'Uang Free < Rp 1 Jt' },
  { value: 45, colorClassName: 'bg-emerald-500', label: 'Feb-Jun (Fase Lega)', caption: 'Uang Free ~Rp 2.3 - 2.5 Jt' },
  { value: 25, colorClassName: 'bg-emerald-700', label: 'Jul-Sep (Fase Merdeka)', caption: 'Uang Free Rp 3.68 Jt' },
]

export const monthlyProjection: MonthProjectionCardProps[] = [
  { month: '30-Okt', tag: 'Bulan 1', totalPay: 3_981_000, freeMoney: 519_000, note: 'Reja: 1.750 • Akulaku: 300' },
  {
    month: '30-Nov',
    tag: 'Kritis',
    totalPay: 4_267_000,
    freeMoney: 233_000,
    note: 'Reja: 2.108 • Pira: 150',
    variant: 'critical',
    ribbon: 'Paling Berat',
  },
  { month: 'Desember', tag: 'Bulan 3', totalPay: 3_653_000, freeMoney: 847_000, note: 'Pira: 1.400 • Tunaiku: 701' },
  { month: 'Januari', tag: 'Bulan 4', totalPay: 3_458_000, freeMoney: 1_042_000, note: 'Pira Lunas (1.300)' },
  {
    month: 'Februari',
    tag: 'Lega!',
    totalPay: 2_158_000,
    freeMoney: 2_342_000,
    note: 'Turun Rp 1,3 Jt/bln!',
    variant: 'turning',
    ribbon: 'Titik Balik 🚀',
  },
  { month: 'Maret', tag: 'Bulan 6', totalPay: 2_158_000, freeMoney: 2_342_000, note: 'Tunaiku: 701 • Ortu: 500', variant: 'calm' },
  { month: 'April', tag: 'Bulan 7', totalPay: 2_158_000, freeMoney: 2_342_000, note: 'Kredivo cicilan akhir', variant: 'calm' },
  { month: 'Mei', tag: 'Bulan 8', totalPay: 1_968_000, freeMoney: 2_532_000, note: 'Kredivo Lunas', variant: 'calm' },
  { month: 'Juni', tag: 'Bulan 9', totalPay: 1_968_000, freeMoney: 2_532_000, note: 'Adakami & Spinjam stabil', variant: 'calm' },
  { month: 'Juli', tag: 'Bulan 10', totalPay: 1_968_000, freeMoney: 2_532_000, note: 'Adakami & Tunaiku lunas', variant: 'calm' },
  { month: 'Agustus', tag: 'Bulan 11', totalPay: 1_521_000, freeMoney: 2_979_000, note: 'Tunaiku & Adakami selesai', variant: 'calm' },
  { month: 'September', tag: 'Puncak', totalPay: 820_000, freeMoney: 3_680_000, note: 'Tersisa Ortu & Spinjam', variant: 'peak' },
]

export const loanPlans: (LoanPlanCardProps & { id: string })[] = [
  {
    id: 'tunaiku',
    order: 10,
    name: 'Tunaiku',
    tag: { label: 'Terbesar', tone: 'danger' },
    dueLabel: 'Tanggal 11',
    installmentLabel: 'Rp 701 rb/bln',
    total: 5_808_000,
    footerStart: 'Mulai Nov: 200 rb, lalu 701 rb x 8 bln',
    footerEnd: 'Hingga Jul',
  },
  {
    id: 'adakami',
    order: 7,
    name: 'Adakami 2.800.000',
    dueLabel: 'Tanggal 1',
    installmentLabel: 'Rp 406 rb/bln',
    total: 4_060_000,
    footerStart: '10 Periode (Okt - Jul)',
    footerEnd: '10 x Rp 406 rb',
  },
  {
    id: 'reja',
    order: 2,
    name: 'Reja',
    tag: { label: 'Prioritas Nov', tone: 'warning' },
    dueLabel: 'Tiap Gajian',
    installmentLabel: 'Okt: 1.750 | Nov: 2.108',
    total: 3_858_000,
    footerStart: 'Lunas setelah 30-Nov! 🎉',
    footerStartTone: 'success',
    footerEnd: 'Selesai bln Nov',
  },
  {
    id: 'pira',
    order: 1,
    name: 'Pira',
    dueLabel: 'Tiap Gajian',
    installmentLabel: 'Des: 1.400 | Jan: 1.300',
    total: 2_850_000,
    footerStart: 'Nov: 150 rb • Des: 1.4 Jt • Jan: 1.3 Jt',
    footerEnd: 'Lunas Jan',
    footerEndTone: 'success',
  },
  {
    id: 'spinjam',
    order: '-',
    name: 'Spinjam Reja',
    dueLabel: 'Tanggal Gajian',
    installmentLabel: 'Rp 225 rb/bln',
    total: 2_250_000,
    footerStart: 'Rata tiap bulan (Okt s/d Sep)',
    footerEnd: '10 x Rp 225 rb',
  },
  {
    id: 'kredivo',
    order: 9,
    name: 'Kredivo',
    dueLabel: 'Tanggal 26',
    installmentLabel: 'Rp 190 rb/bln',
    total: 1_330_000,
    footerStart: '7 Bulan pembayaran (Okt - Apr)',
    footerEnd: 'Lunas di Mei',
    footerEndTone: 'success',
  },
]
