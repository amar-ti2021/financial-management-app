// Catalog of every reusable component with live examples, grouped like src/components/.
import type { ReactNode } from 'react'
import {
  BalanceCard,
  DebtCard,
  DebtOverviewCard,
  DebtStatusCard,
  FinancialScoreCard,
  InsightCard,
  InstallmentList,
  LoanCostCard,
  LoanPlanCard,
  LoanSummaryCard,
  MonthProjectionCard,
  ProfileCard,
  ProjectionHeroCard,
  QuickActionButton,
  RiskIndicator,
  SavingsCompareCard,
  TransactionItem,
} from '@/components/finance'
import { OptionCard, PasswordField, TextField } from '@/components/form'
import {
  AuthLayout,
  BottomNav,
  BrandHeader,
  FloatingActionBar,
  MobileShell,
  PageHeader,
  StickyFooter,
  TaskHeader,
  type BottomNavItem,
} from '@/components/layout'
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  Chip,
  Divider,
  FootNote,
  GoogleButton,
  Icon,
  IconButton,
  IconTile,
  MenuGroup,
  MenuItem,
  Money,
  PageIntro,
  ProgressBar,
  SectionHeader,
  SegmentBar,
  SegmentedControl,
  StatTile,
  type IconTileTone,
} from '@/components/ui'
import {
  debtOverview,
  debts,
  loanDetails,
  loanPlans,
  monthlyProjection,
  projection,
  projectionPhases,
  recentTransactions,
  TODAY,
  user,
  wallet,
} from '@/data/mock'
import {
  AmountFieldDemo,
  AmountInputDemo,
  ChipGroupDemo,
  DueDateFieldDemo,
  MenuItemDemo,
  OptionGroupDemo,
  RangeFieldDemo,
  SegmentedControlDemo,
  SwitchDemo,
  ToastDemo,
} from './demos'
import { PreviewFrame, Variant } from './Specimen'

export type GroupKey = 'ui' | 'form' | 'layout' | 'finance'

export const groups: { key: GroupKey; label: string; path: string; description: string }[] = [
  { key: 'ui', label: 'UI', path: '@/components/ui', description: 'Primitive generik: tombol, chip, badge, kartu, ikon.' },
  { key: 'form', label: 'Form', path: '@/components/form', description: 'Input dan kontrol pilihan untuk form "Catat".' },
  { key: 'layout', label: 'Layout', path: '@/components/layout', description: 'Kerangka layar: shell, header, navigasi, bar bawah.' },
  {
    key: 'finance',
    label: 'Finance',
    path: '@/components/finance',
    description: 'Kartu domain: saldo, hutang, cicilan, simulasi, proyeksi, profil.',
  },
]

export type Specimen = {
  name: string
  group: GroupKey
  description: string
  demo: ReactNode
}

const noop = () => {}

// The tabs as Beranda shows them now: no pages behind them yet, so no links.
const demoTabs: BottomNavItem[] = [
  { label: 'Beranda', icon: 'home', active: true },
  { label: 'Catat', icon: 'add_circle' },
  { label: 'Pinjaman', icon: 'credit_card' },
  { label: 'Kalkulator', icon: 'calculate' },
]

// The same tabs once their pages exist. The catalog lives at /komponen, so "Lainnya" is active here.
const linkedTabs: BottomNavItem[] = [
  { to: '/', label: 'Beranda', icon: 'home', end: true },
  { to: '/pinjaman', label: 'Pinjaman', icon: 'credit_card' },
  { to: '/komponen', label: 'Lainnya', icon: 'widgets' },
]

const tileTones: IconTileTone[] = [
  'primary',
  'primary-soft',
  'secondary',
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
  'tertiary',
]

const bri = loanDetails.bri

export const specimens: Specimen[] = [
  /* ---------- UI ---------- */
  {
    name: 'Icon',
    group: 'ui',
    description: 'Glyph Material Symbols. Outline atau filled, ukuran dalam px, dekoratif secara default.',
    demo: (
      <>
        <Variant label="outline · filled">
          <Icon name="home" />
          <Icon name="home" filled />
          <Icon name="check_circle" className="text-primary" />
          <Icon name="check_circle" filled className="text-primary" />
        </Variant>
        <Variant label="size 16 · 24 · 32">
          <Icon name="savings" size={16} />
          <Icon name="savings" />
          <Icon name="savings" size={32} />
        </Variant>
      </>
    ),
  },
  {
    name: 'Button',
    group: 'ui',
    description: 'Tombol aksi. Tinggi 56px untuk aksi utama, efek tekan scale 0.98.',
    demo: (
      <>
        <Variant label="variant">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Variant>
        <Variant label="size lg · md · sm · xs + icon">
          <Button size="lg" icon="check_circle">
            Large
          </Button>
          <Button icon="add_circle">Medium</Button>
          <Button size="sm" icon="verified">
            Small
          </Button>
          <Button size="xs" icon="edit_note" variant="outline">
            XS
          </Button>
        </Variant>
        <Variant label="fullWidth · loading · disabled" stack>
          <Button size="lg" fullWidth icon="check_circle" iconFilled>
            Simpan Pengeluaran
          </Button>
          <Button size="lg" fullWidth loading>
            Menyimpan…
          </Button>
          <Button fullWidth disabled>
            Disabled
          </Button>
        </Variant>
      </>
    ),
  },
  {
    name: 'GoogleButton',
    group: 'ui',
    description: 'Tombol masuk/daftar dengan Google sesuai pedoman brand Google: putih, logo G berwarna.',
    demo: (
      <Variant label="default · label custom · loading" stack>
        <GoogleButton onClick={noop} />
        <GoogleButton onClick={noop}>Daftar dengan Google</GoogleButton>
        <GoogleButton loading>Menghubungkan…</GoogleButton>
      </Variant>
    ),
  },
  {
    name: 'Divider',
    group: 'ui',
    description: 'Garis pemisah, opsional dengan teks di tengah ("atau").',
    demo: (
      <Variant label="dengan label · polos" stack>
        <Divider label="atau masuk dengan email" />
        <Divider />
      </Variant>
    ),
  },
  {
    name: 'IconButton',
    group: 'ui',
    description: 'Tombol ikon saja dengan label aksesibel wajib.',
    demo: (
      <>
        <Variant label="variant ghost · tonal · brand">
          <IconButton icon="help" label="Bantuan" />
          <IconButton icon="notifications" label="Notifikasi" variant="tonal" />
          <IconButton icon="share" label="Bagikan" variant="brand" />
        </Variant>
        <Variant label="variant inverse (di atas warna gelap)" className="rounded-xl bg-primary p-2">
          <IconButton icon="visibility" label="Sembunyikan saldo" variant="inverse" />
        </Variant>
        <Variant label="size sm · md · lg · shape rounded">
          <IconButton icon="settings" label="Pengaturan" variant="tonal" size="sm" />
          <IconButton icon="settings" label="Pengaturan" variant="tonal" />
          <IconButton icon="settings" label="Pengaturan" variant="tonal" size="lg" />
          <IconButton icon="arrow_back" label="Kembali" variant="tonal" size="lg" shape="rounded" />
        </Variant>
      </>
    ),
  },
  {
    name: 'Chip',
    group: 'ui',
    description: 'Chip yang bisa dipilih. Terpilih = primary solid, idle = permukaan tenang.',
    demo: (
      <>
        <Variant label="shape pill · size lg · dot">
          <Chip size="lg" selected>
            Semua (3)
          </Chip>
          <Chip size="lg" dotClassName="bg-tertiary-container">
            Jatuh Tempo (1)
          </Chip>
        </Variant>
        <Variant label="shape rounded · size md">
          <Chip shape="rounded" selected className="w-20">
            +50 rb
          </Chip>
          <Chip shape="rounded" className="w-20">
            +100 rb
          </Chip>
        </Variant>
        <Variant label="size sm">
          <Chip size="sm" selected>
            2 Jt
          </Chip>
          <Chip size="sm">5 Jt</Chip>
        </Variant>
      </>
    ),
  },
  {
    name: 'ChipGroup',
    group: 'ui',
    description: 'Deretan chip single-select (radiogroup): filter, nominal cepat, preset tenor.',
    demo: <ChipGroupDemo />,
  },
  {
    name: 'Badge',
    group: 'ui',
    description: 'Pill status statis: "Lunas", "Jatuh Tempo", "Aktif".',
    demo: (
      <>
        <Variant label="variant soft · tone">
          <Badge tone="success">Lunas</Badge>
          <Badge tone="warning">Prioritas</Badge>
          <Badge tone="danger">Jatuh Tempo</Badge>
          <Badge tone="neutral">3 / 12 Lunas</Badge>
          <Badge tone="primary">Akhir</Badge>
        </Variant>
        <Variant label="variant solid">
          <Badge tone="success" variant="solid">
            Aman
          </Badge>
          <Badge tone="warning" variant="solid">
            Waspada
          </Badge>
          <Badge tone="danger" variant="solid">
            Bahaya
          </Badge>
          <Badge tone="primary" variant="solid">
            Baru
          </Badge>
        </Variant>
        <Variant label="dot · icon · bordered · size">
          <Badge tone="success" dot>
            Aktif
          </Badge>
          <Badge tone="danger" icon="schedule">
            12 Hari Lagi
          </Badge>
          <Badge tone="warning" icon="schedule" bordered className="font-bold">
            Mendekati Jatuh Tempo
          </Badge>
          <Badge size="xs" tone="primary" shape="rounded">
            xs
          </Badge>
          <Badge size="md">md</Badge>
        </Variant>
      </>
    ),
  },
  {
    name: 'Card',
    group: 'ui',
    description: 'Permukaan dasar (Tier 1). Bisa dirender sebagai div, section, atau article.',
    demo: (
      <>
        <Variant label="variant elevated · outlined · tonal" stack>
          <Card>
            <p className="text-body-sm">elevated (default): putih, border tipis, bayangan halus</p>
          </Card>
          <Card variant="outlined">
            <p className="text-body-sm">outlined: putih dengan border, tanpa bayangan</p>
          </Card>
          <Card variant="tonal">
            <p className="text-body-sm">tonal: permukaan sedikit tersirat</p>
          </Card>
        </Variant>
        <Variant label="radius md · lg · xl">
          <Card radius="md" padding="sm" className="text-label-sm">
            md
          </Card>
          <Card padding="sm" className="text-label-sm">
            lg
          </Card>
          <Card radius="xl" padding="sm" className="text-label-sm">
            xl
          </Card>
        </Variant>
      </>
    ),
  },
  {
    name: 'IconTile',
    group: 'ui',
    description: 'Ikon di dalam lingkaran/squircle berwarna: avatar kategori, penanda list.',
    demo: (
      <>
        <Variant label="tone">
          {tileTones.map((tone) => (
            <IconTile key={tone} icon="savings" tone={tone} />
          ))}
          <span className="rounded-full bg-primary p-1">
            <IconTile icon="savings" tone="inverse" />
          </span>
        </Variant>
        <Variant label="size xs → xl · shape rounded">
          <IconTile icon="payments" size="xs" shape="rounded" />
          <IconTile icon="payments" size="sm" shape="rounded" />
          <IconTile icon="payments" shape="rounded" />
          <IconTile icon="payments" size="lg" shape="rounded" />
          <IconTile icon="payments" size="xl" shape="rounded" />
        </Variant>
      </>
    ),
  },
  {
    name: 'Avatar',
    group: 'ui',
    description: 'Foto profil, atau inisial bila tidak ada foto. Bisa memakai segel terverifikasi.',
    demo: (
      <Variant label="size md · xl + verified">
        <Avatar name={user.name} />
        <Avatar name={user.name} size="xl" verified />
      </Variant>
    ),
  },
  {
    name: 'Money',
    group: 'ui',
    description: 'Nominal Rupiah dengan angka tabular, opsi tanda +/- dan mode privasi.',
    demo: (
      <Variant label="default · sign · negatif · hidden" stack>
        <Money value={3_450_000} className="text-title-lg font-bold" />
        <Money value={1_000_000} sign className="text-title-lg font-bold text-emerald-700" />
        <Money value={-35_000} className="text-title-lg font-bold" />
        <Money value={3_450_000} hidden className="text-title-lg font-bold" />
      </Variant>
    ),
  },
  {
    name: 'ProgressBar',
    group: 'ui',
    description: 'Bar progres 0–100 dengan label opsional di atasnya.',
    demo: (
      <Variant label="dengan label · polos" stack>
        <ProgressBar value={33} label="Progres Angsuran (4/12)" valueLabel="33% Selesai" />
        <ProgressBar value={70} />
      </Variant>
    ),
  },
  {
    name: 'SegmentBar',
    group: 'ui',
    description: 'Bar bertumpuk per fase dengan label di atas dan keterangan di bawah.',
    demo: <SegmentBar segments={projectionPhases} className="text-emerald-800" />,
  },
  {
    name: 'SegmentedControl',
    group: 'ui',
    description: 'Tab sama lebar di atas track cekung, untuk berpindah bagian halaman.',
    demo: <SegmentedControlDemo />,
  },
  {
    name: 'Switch',
    group: 'ui',
    description: 'Toggle on/off (role="switch") dengan area sentuh 48px.',
    demo: <SwitchDemo />,
  },
  {
    name: 'SectionHeader',
    group: 'ui',
    description: 'Judul bagian dengan subjudul dan slot kanan (hint, tombol, badge).',
    demo: (
      <>
        <Variant label="size sm · aside teks" stack>
          <SectionHeader title="Kategori Pengeluaran" size="sm" aside="Pilih salah satu" />
        </Variant>
        <Variant label="size lg · aside tombol" stack>
          <SectionHeader title="Riwayat Transaksi" size="lg" aside={<Button variant="ghost">Lihat Semua</Button>} />
        </Variant>
        <Variant label="subtitle · aside badge" stack>
          <SectionHeader
            title="Jadwal 12x Cicilan"
            subtitle="25 Agu 2024 – 25 Jul 2025"
            size="lg"
            aside={<Badge size="md">3 / 12 Lunas</Badge>}
          />
        </Variant>
      </>
    ),
  },
  {
    name: 'PageIntro',
    group: 'ui',
    description: 'Pembuka halaman: eyebrow opsional, judul besar, deskripsi satu baris.',
    demo: (
      <>
        <Variant label="size display" stack>
          <PageIntro size="display" title="Halo, Rian! 👋" description="Yuk catat keuanganmu hari ini." />
        </Variant>
        <Variant label="size headline · eyebrow" stack>
          <PageIntro
            eyebrow={{ icon: 'calculate', label: 'Simulasi Finansial' }}
            title="Kalkulator Pinjaman & Tabungan"
            description="Simulasi cerdas hitung biaya riil pinjaman vs potensi jika ditabung."
          />
        </Variant>
      </>
    ),
  },
  {
    name: 'Callout',
    group: 'ui',
    description: 'Banner tips, info, atau peringatan, dengan ikon polos atau di dalam tile.',
    demo: (
      <Variant label="tone · iconStyle · size · aside" stack>
        <Callout icon="shield" title="Tips Aman Unbound">
          tone neutral, ikon polos.
        </Callout>
        <Callout tone="success" icon="health_and_safety" iconFilled title="Tips Bebas Cemas">
          tone success.
        </Callout>
        <Callout tone="info" icon="savings" iconStyle="tile" title="Rencana Pelunasan Terarah">
          tone info, iconStyle tile.
        </Callout>
        <Callout tone="warning" icon="lightbulb" iconStyle="tile">
          tone warning tanpa judul.
        </Callout>
        <Callout
          tone="danger"
          icon="warning"
          iconStyle="tile"
          title="Waspada Pinjaman Ilegal"
          aside={
            <Badge tone="danger" variant="solid" shape="rounded">
              Bahaya
            </Badge>
          }
        >
          tone danger dengan aside.
        </Callout>
        <Callout size="sm" icon="verified_user">
          size sm untuk catatan di dalam form.
        </Callout>
      </Variant>
    ),
  },
  {
    name: 'FootNote',
    group: 'ui',
    description: 'Baris penenang kecil di bawah aksi utama.',
    demo: (
      <Variant label="default · icon" stack>
        <FootNote>Data tercatat aman di perangkat tanpa iklan</FootNote>
        <FootNote icon="shield">Pengingat otomatis aktif sebelum jatuh tempo</FootNote>
      </Variant>
    ),
  },
  {
    name: 'StatTile',
    group: 'ui',
    description: 'Tile metrik: label (+ikon), nilai, suffix, dan footer opsional.',
    demo: (
      <>
        <Variant label="size sm · variant card" stack className="grid grid-cols-2">
          <StatTile icon="payments" label="Nominal Cicilan" value="Rp 250.000" suffix="/ bln" />
          <StatTile icon="calendar_month" label="Total Tenor" value="12 Bulan" suffix="(1 Thn)" />
        </Variant>
        <Variant label="size lg · variant tonal · footer" stack className="grid grid-cols-2">
          <StatTile
            variant="tonal"
            size="lg"
            label="Bebas Bunga Saved"
            value="Rp 1.850.000"
            valueClassName="text-primary"
            footer={
              <span className="flex items-center gap-0.5 text-primary-container">
                <Icon name="trending_up" size={14} /> Terproteksi
              </span>
            }
          />
          <StatTile variant="tonal" size="lg" label="Target Tabungan" value="2 Pos Aktif" />
        </Variant>
      </>
    ),
  },
  {
    name: 'MenuGroup',
    group: 'ui',
    description: 'Kartu berjudul berisi MenuItem dengan garis pemisah (daftar pengaturan).',
    demo: (
      <MenuGroup title="Keamanan & Privasi">
        <MenuItem icon="fingerprint" title="Kunci Keamanan" description="PIN, Sidik Jari & Face ID" onClick={noop} />
        <MenuItem
          icon="notifications_active"
          title="Peringatan Jatuh Tempo"
          description="Notifikasi App & WhatsApp"
          onClick={noop}
        />
      </MenuGroup>
    ),
  },
  {
    name: 'MenuItem',
    group: 'ui',
    description: 'Baris pengaturan: ikon, judul, deskripsi, slot trailing, chevron bila bisa diklik.',
    demo: <MenuItemDemo />,
  },
  {
    name: 'Toast',
    group: 'ui',
    description: 'Konfirmasi singkat di atas layar yang hilang sendiri setelah 2,5 detik.',
    demo: <ToastDemo />,
  },

  /* ---------- Form ---------- */
  {
    name: 'AmountInput',
    group: 'form',
    description: 'Input Rupiah besar: prefix "Rp" tetap, keypad numerik, titik ribuan otomatis.',
    demo: <AmountInputDemo />,
  },
  {
    name: 'AmountField',
    group: 'form',
    description: 'Kartu nominal di atas form Catat: label, AmountInput, chip tambah cepat.',
    demo: <AmountFieldDemo />,
  },
  {
    name: 'OptionCard',
    group: 'form',
    description: 'Kartu radio besar untuk kategori, sumber dana, dan pemberi pinjaman.',
    demo: (
      <>
        <Variant label="layout stacked · selected / idle · tone" stack className="grid grid-cols-2">
          <OptionCard
            icon="group"
            title="Keluarga / Teman"
            description="Bebas bunga & denda"
            descriptionTone="primary"
            selected
            onSelect={noop}
          />
          <OptionCard
            icon="warning"
            title="Lainnya"
            description="Waspada bunga tinggi"
            iconTone="danger"
            descriptionTone="danger"
            selected={false}
            onSelect={noop}
          />
        </Variant>
        <Variant label="layout inline" stack className="grid grid-cols-2">
          <OptionCard layout="inline" icon="payments" title="Kas Tunai" selected onSelect={noop} />
          <OptionCard
            layout="inline"
            icon="account_balance_wallet"
            title="Bank / E-Wallet"
            description="BCA, GoPay, QRIS"
            selected={false}
            onSelect={noop}
          />
        </Variant>
      </>
    ),
  },
  {
    name: 'OptionGroup',
    group: 'form',
    description: 'Radiogroup dua kolom berisi OptionCard.',
    demo: <OptionGroupDemo />,
  },
  {
    name: 'TextField',
    group: 'form',
    description: 'Input teks dengan label tetap di atas (tanpa floating label), teks bantuan, dan pesan error.',
    demo: (
      <>
        <Variant label="hint · trailingIcon · polos" stack>
          <TextField
            label="Catatan"
            hint="(Boleh dikosongkan)"
            trailingIcon="edit_note"
            placeholder="Misal: Makan siang, bensin motor..."
          />
          <TextField label="Nama pemberi pinjaman" placeholder="Misal: Paman Budi" />
        </Variant>
        <Variant label="helper · error" stack>
          <TextField label="Email" type="email" placeholder="nama@email.com" helper="Kami kirim tautan konfirmasi ke sini." />
          <TextField
            label="Email"
            type="email"
            defaultValue="rian@email"
            error="Format email belum benar, contoh: nama@email.com."
          />
        </Variant>
        <Variant label="readOnly (bisa dibaca, tidak bisa diubah)" stack>
          <TextField
            label="Email"
            type="email"
            value="rian.pratama@email.com"
            readOnly
            trailingIcon="lock"
            helper="Email dipakai untuk masuk dan belum bisa diganti."
          />
        </Variant>
      </>
    ),
  },
  {
    name: 'PasswordField',
    group: 'form',
    description: 'Input kata sandi dengan tombol lihat/sembunyikan, supaya user bisa memeriksa ketikannya.',
    demo: (
      <Variant label="helper · error" stack>
        <PasswordField label="Kata sandi" autoComplete="new-password" helper="Minimal 8 karakter." />
        <PasswordField label="Kata sandi" defaultValue="rahasia" error="Kata sandi minimal 8 karakter." />
      </Variant>
    ),
  },
  {
    name: 'RangeField',
    group: 'form',
    description: 'Slider berlabel dengan nilai live, tick referensi, dan slot di bawahnya.',
    demo: <RangeFieldDemo />,
  },
  {
    name: 'DueDateField',
    group: 'form',
    description: 'Pemilih jatuh tempo: tanggal relatif + absolut, "Ubah" membuka date picker native.',
    demo: <DueDateFieldDemo />,
  },

  /* ---------- Layout ---------- */
  {
    name: 'MobileShell',
    group: 'layout',
    description: 'Kolom selebar ponsel (maks. 448px) yang membungkus setiap layar.',
    demo: (
      <PreviewFrame className="h-[380px]">
        <MobileShell bottomInset="nav" className="min-h-full shadow-none">
          <BrandHeader
            userName={user.name}
            subtitle="Keuangan Aman"
            action={<IconButton icon="notifications" label="Notifikasi" variant="tonal" />}
          />
          <div className="space-y-3 px-4">
            <PageIntro title="Isi halaman" description="Header, konten, dan BottomNav di dalam MobileShell." />
            <Card>
              <p className="text-body-sm">Konten layar</p>
            </Card>
          </div>
          <BottomNav items={demoTabs} />
        </MobileShell>
      </PreviewFrame>
    ),
  },
  {
    name: 'AuthLayout',
    group: 'layout',
    description: 'Kerangka layar Masuk/Daftar: logo, judul, konten, dan tautan di bagian bawah.',
    demo: (
      <PreviewFrame className="h-[520px]">
        <AuthLayout
          className="min-h-full shadow-none"
          title="Masuk ke akunmu"
          description="Pantau keuangan dan jadwal cicilanmu dengan tenang."
          footer={<p className="text-center text-body-md text-on-surface-variant">Belum punya akun? Daftar sekarang</p>}
        >
          <GoogleButton onClick={noop} />
          <Divider label="atau" />
          <Card variant="tonal">
            <p className="text-body-sm">Form di sini</p>
          </Card>
        </AuthLayout>
      </PreviewFrame>
    ),
  },
  {
    name: 'BrandHeader',
    group: 'layout',
    description: 'App bar tab utama: avatar (link ke profil bila ada profileTo), nama brand, baris status, satu aksi.',
    demo: (
      <PreviewFrame>
        <BrandHeader
          userName={user.name}
          subtitle={
            <span className="flex items-center gap-1">
              <Icon name="check_circle" filled size={16} /> Keuangan Aman
            </span>
          }
          action={<IconButton icon="notifications" label="Notifikasi" variant="tonal" />}
        />
      </PreviewFrame>
    ),
  },
  {
    name: 'TaskHeader',
    group: 'layout',
    description: 'Header layar tugas (form, detail): tombol kembali berteks, judul di tengah.',
    demo: (
      <>
        <Variant label='backLabel "Batal" (form)' stack>
          <PreviewFrame>
            <TaskHeader
              title="Catat Pengeluaran"
              onBack={noop}
              action={<IconButton icon="help" label="Bantuan" variant="tonal" />}
            />
          </PreviewFrame>
        </Variant>
        <Variant label='backLabel "Kembali" (detail)' stack>
          <PreviewFrame>
            <TaskHeader
              title="Detail Hutang"
              backLabel="Kembali"
              onBack={noop}
              action={<IconButton icon="share" label="Bagikan" />}
            />
          </PreviewFrame>
        </Variant>
      </>
    ),
  },
  {
    name: 'PageHeader',
    group: 'layout',
    description: 'Header halaman daftar/ringkasan: tombol kembali ikon, judul + subjudul, slot baris bawah.',
    demo: (
      <PreviewFrame>
        <PageHeader
          title="Proyeksi & Jadwal Hutang"
          subtitle="Data Keuangan & Uang Free"
          onBack={noop}
          actions={<IconButton icon="share" label="Bagikan" variant="brand" size="sm" />}
        >
          <SegmentedControl
            label="Bagian halaman"
            value="matrix"
            onChange={noop}
            options={[
              { value: 'matrix', label: 'Matriks', icon: 'table' },
              { value: 'loans', label: 'Pinjaman', icon: 'event_available' },
            ]}
          />
        </PageHeader>
      </PreviewFrame>
    ),
  },
  {
    name: 'BottomNav',
    group: 'layout',
    description: 'Tab bar tetap (Tier 2). Tab aktif mendapat pill tonal dan ikon filled.',
    demo: (
      <>
        <Variant label="tanpa to: tampil tapi belum ke mana-mana · active" stack>
          <PreviewFrame className="h-20">
            <BottomNav items={demoTabs} />
          </PreviewFrame>
        </Variant>
        <Variant label="dengan to: NavLink, tab aktif mengikuti URL" stack>
          <PreviewFrame className="h-20">
            <BottomNav items={linkedTabs} />
          </PreviewFrame>
        </Variant>
      </>
    ),
  },
  {
    name: 'StickyFooter',
    group: 'layout',
    description: 'Area aksi yang menempel di bawah layar tugas: CTA utama + footnote.',
    demo: (
      <PreviewFrame>
        <StickyFooter>
          <Button size="lg" fullWidth icon="check_circle" iconFilled>
            Simpan Pengeluaran
          </Button>
          <FootNote>Data tercatat aman di perangkat tanpa iklan</FootNote>
        </StickyFooter>
      </PreviewFrame>
    ),
  },
  {
    name: 'FloatingActionBar',
    group: 'layout',
    description: 'Aksi selebar layar yang menempel tepat di atas BottomNav.',
    demo: (
      <PreviewFrame className="h-44">
        <FloatingActionBar>
          <Button size="lg" fullWidth icon="add_circle" className="rounded-xl bg-primary shadow-lg">
            Catat Hutang Baru
          </Button>
        </FloatingActionBar>
        <BottomNav items={demoTabs} />
      </PreviewFrame>
    ),
  },

  /* ---------- Finance ---------- */
  {
    name: 'BalanceCard',
    group: 'finance',
    description: 'Kartu saldo Beranda dengan toggle privasi, ringkasan masuk/keluar, dan link.',
    demo: (
      <BalanceCard
        balance={wallet.balance}
        income={wallet.income}
        expense={wallet.expense}
        link={{ label: 'Proyeksi & Jadwal Arus Kas Hutang', to: '/proyeksi' }}
      />
    ),
  },
  {
    name: 'QuickActionButton',
    group: 'finance',
    description: 'Tile pintasan besar yang ramah jempol.',
    demo: (
      <Variant label="tone danger · success · warning" className="grid grid-cols-3">
        <QuickActionButton to="/catat/pengeluaran" icon="remove_circle" tone="danger" label="Catat Keluar" />
        <QuickActionButton to="/catat/pemasukan" icon="add_circle" tone="success" label="Catat Masuk" />
        <QuickActionButton to="/catat/hutang" icon="edit_note" tone="warning" label="Catat Hutang" />
      </Variant>
    ),
  },
  {
    name: 'TransactionItem',
    group: 'finance',
    description: 'Baris transaksi: avatar kategori, judul + meta, nominal bertanda.',
    demo: (
      <Variant label="pengeluaran · pemasukan" stack>
        {recentTransactions.map(({ id, ...transaction }) => (
          <TransactionItem key={id} {...transaction} />
        ))}
      </Variant>
    ),
  },
  {
    name: 'DebtStatusCard',
    group: 'finance',
    description: 'Ringkasan kewajiban satu baris di Beranda.',
    demo: (
      <Variant label="status safe · warning · danger" stack>
        <DebtStatusCard amount={0} status="safe" statusLabel="(Aman & Bebas Hutang)" />
        <DebtStatusCard amount={1_500_000} status="warning" statusLabel="(Jatuh tempo 5 hari)" />
        <DebtStatusCard amount={4_500_000} status="danger" statusLabel="(Melebihi batas aman)" />
      </Variant>
    ),
  },
  {
    name: 'DebtOverviewCard',
    group: 'finance',
    description: 'Hero gradien di daftar hutang: total, status perisai, rasio hutang.',
    demo: <DebtOverviewCard {...debtOverview} />,
  },
  {
    name: 'DebtCard',
    group: 'finance',
    description: 'Kartu hutang: pemberi pinjaman, status, sisa pokok, rencana, jatuh tempo.',
    demo: (
      <Variant label="urgent · normal" stack>
        {debts.slice(0, 2).map(({ id, plan, planAmount, ...debt }) => (
          <DebtCard
            key={id}
            {...debt}
            plan={
              <>
                {plan} <span className="font-bold">{planAmount}</span>
              </>
            }
          />
        ))}
      </Variant>
    ),
  },
  {
    name: 'LoanSummaryCard',
    group: 'finance',
    description: 'Kartu atas detail pinjaman: sisa pokok, progres angsuran, tagihan berikutnya.',
    demo: (
      <LoanSummaryCard
        lender={bri.lender}
        icon={bri.icon}
        registeredLabel={bri.registeredLabel}
        statusLabel={bri.statusLabel}
        remaining={bri.remaining}
        ceiling={bri.ceiling}
        interestLabel={bri.interestLabel}
        paidCount={3}
        totalCount={12}
        nextDue={{ date: '25 Nov 2024', amount: 250_000, daysLeft: 12 }}
      />
    ),
  },
  {
    name: 'InstallmentList',
    group: 'finance',
    description: 'Jadwal cicilan: baris lunas, baris jatuh tempo dengan aksi, baris mendatang ringkas.',
    demo: <InstallmentList installments={bri.installments.slice(1, 7)} total={12} today={TODAY} />,
  },
  {
    name: 'RiskIndicator',
    group: 'finance',
    description: 'Banner risiko pinjaman dengan badge level.',
    demo: (
      <Variant label="level safe · caution · danger" stack>
        <RiskIndicator level="safe" />
        <RiskIndicator level="caution" />
        <RiskIndicator level="danger" />
      </Variant>
    ),
  },
  {
    name: 'LoanCostCard',
    group: 'finance',
    description: 'Hasil simulasi "Opsi A": biaya riil jika meminjam.',
    demo: <LoanCostCard monthly={363_333} total={2_180_000} interest={180_000} />,
  },
  {
    name: 'SavingsCompareCard',
    group: 'finance',
    description: 'Hasil simulasi "Opsi B": cicilan yang sama bila ditabung.',
    demo: <SavingsCompareCard accumulated={2_180_000} savedInterest={180_000} />,
  },
  {
    name: 'ProjectionHeroCard',
    group: 'finance',
    description: 'Hero gelap proyeksi arus kas: total hutang tersisa dan titik ekstrem uang free.',
    demo: <ProjectionHeroCard {...projection} />,
  },
  {
    name: 'InsightCard',
    group: 'finance',
    description: 'Kartu sorotan positif dengan timeline fase opsional.',
    demo: (
      <InsightCard icon="rocket_launch" title="Titik Balik Merdeka Finansial: Februari" tag="10x Lipat!" phases={projectionPhases}>
        Cicilan turun dari <strong>Rp 4,26 Jt</strong> ke <strong>Rp 2,15 Jt</strong>.
      </InsightCard>
    ),
  },
  {
    name: 'MonthProjectionCard',
    group: 'finance',
    description: 'Satu bulan di matriks arus kas: total bayar vs uang free.',
    demo: (
      <Variant label="variant default · critical · turning · calm · peak · ribbon" stack>
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-3 pb-1">
          {[0, 1, 4, 5, 11].map((index) => (
            <MonthProjectionCard key={index} {...monthlyProjection[index]} />
          ))}
        </div>
      </Variant>
    ),
  },
  {
    name: 'LoanPlanCard',
    group: 'finance',
    description: 'Baris rincian pinjaman: cicilan, total, dan jendela pelunasan.',
    demo: (
      <Variant label="tag danger · footer success" stack>
        {[loanPlans[0], loanPlans[2]].map(({ id, ...plan }) => (
          <LoanPlanCard key={id} {...plan} />
        ))}
      </Variant>
    ),
  },
  {
    name: 'ProfileCard',
    group: 'finance',
    description: 'Header profil: avatar terverifikasi, nama, tagline, kontak, tombol edit.',
    demo: (
      <ProfileCard
        name={user.name}
        verified={user.verified}
        tagline={user.tagline}
        email={user.email}
        phone={user.phone}
        onEdit={noop}
      />
    ),
  },
  {
    name: 'FinancialScoreCard',
    group: 'finance',
    description: 'Skor kesehatan finansial dengan grid dua metrik.',
    demo: (
      <FinancialScoreCard score={85} statusLabel="Sangat Sehat" onInfo={noop}>
        <StatTile variant="tonal" size="lg" label="Bebas Bunga Saved" value="Rp 1.850.000" valueClassName="text-primary" />
        <StatTile variant="tonal" size="lg" label="Target Tabungan" value="2 Pos Aktif" />
      </FinancialScoreCard>
    ),
  },
]
