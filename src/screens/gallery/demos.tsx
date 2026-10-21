// Interactive examples for components that need local state to be shown working.
import { useState } from 'react'
import { AmountField, AmountInput, DueDateField, OptionGroup, RangeField } from '@/components/form'
import { Badge, Button, ChipGroup, MenuItem, SegmentedControl, Switch, Toast } from '@/components/ui'
import { expenseCategories, paymentSources } from '@/data/mock'
import { addDays, formatCompact } from '@/lib/format'
import { Variant } from './Specimen'

const noop = () => {}

export function ChipGroupDemo() {
  const [filter, setFilter] = useState('all')
  const [preset, setPreset] = useState<number | null>(50_000)
  return (
    <>
      <Variant label="layout scroll · size lg (filter tab)" stack>
        <ChipGroup
          label="Filter hutang"
          size="lg"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'Semua (3)' },
            { value: 'soon', label: 'Jatuh Tempo Dekat (1)', dotClassName: 'bg-tertiary-container' },
            { value: 'paid', label: 'Lunas (4)' },
          ]}
        />
      </Variant>
      <Variant label="layout 4 · shape rounded (nominal cepat)" stack>
        <ChipGroup
          label="Pilihan cepat nominal"
          layout={4}
          shape="rounded"
          value={preset}
          onChange={setPreset}
          options={[10_000, 20_000, 50_000, 100_000].map((value) => ({ value, label: `+${formatCompact(value)}` }))}
        />
      </Variant>
    </>
  )
}

export function SegmentedControlDemo() {
  const [tab, setTab] = useState('matrix')
  return (
    <SegmentedControl
      label="Bagian halaman"
      value={tab}
      onChange={setTab}
      options={[
        { value: 'matrix', label: 'Matriks & Arus Kas', icon: 'table' },
        { value: 'loans', label: 'Daftar Pinjaman', icon: 'event_available' },
      ]}
    />
  )
}

export function SwitchDemo() {
  const [on, setOn] = useState(true)
  const [off, setOff] = useState(false)
  return (
    <Variant label="checked · unchecked · disabled">
      <Switch checked={on} onChange={setOn} label="Contoh switch aktif" />
      <Switch checked={off} onChange={setOff} label="Contoh switch mati" />
      <Switch checked onChange={noop} label="Contoh switch nonaktif" disabled />
    </Variant>
  )
}

export function MenuItemDemo() {
  const [privacy, setPrivacy] = useState(true)
  const box = 'w-full rounded-2xl bg-surface-container-lowest p-1'
  return (
    <>
      <Variant label="trailing badge · onClick (chevron)" stack>
        <div className={box}>
          <MenuItem
            icon="fingerprint"
            title="Kunci Keamanan & Biometrik"
            description="PIN, Sidik Jari & Face ID"
            trailing={
              <Badge tone="success" size="md" className="font-bold">
                Aktif
              </Badge>
            }
            onClick={noop}
          />
        </div>
      </Variant>
      <Variant label="trailing kontrol (tanpa onClick)" stack>
        <div className={box}>
          <MenuItem
            icon="visibility_off"
            title="Mode Privasi Saldo"
            description="Sembunyikan nominal di layar"
            trailing={<Switch checked={privacy} onChange={setPrivacy} label="Mode Privasi Saldo" />}
          />
        </div>
      </Variant>
      <Variant label="tone danger" stack>
        <div className={box}>
          <MenuItem
            icon="logout"
            title="Keluar dari Akun"
            description="Sesi perangkat ini akan diakhiri"
            tone="danger"
            onClick={noop}
          />
        </div>
      </Variant>
    </>
  )
}

export function ToastDemo() {
  const [message, setMessage] = useState<string | null>(null)
  return (
    <>
      <Button variant="outline" icon="notifications" onClick={() => setMessage('Pengeluaran Rp 25.000 tersimpan!')}>
        Tampilkan toast
      </Button>
      <Toast message={message} onDismiss={() => setMessage(null)} />
    </>
  )
}

export function AmountInputDemo() {
  const [amount, setAmount] = useState(500_000)
  return <AmountInput aria-label="Nominal" value={amount} onChange={setAmount} clearable />
}

export function AmountFieldDemo() {
  const [amount, setAmount] = useState(25_000)
  return (
    <AmountField
      label="Nominal Pengeluaran"
      value={amount}
      onChange={setAmount}
      presets={[10_000, 20_000, 50_000, 100_000]}
    />
  )
}

export function OptionGroupDemo() {
  const [category, setCategory] = useState('food')
  const [source, setSource] = useState('cash')
  return (
    <>
      <Variant label="layout stacked (kategori)" stack>
        <OptionGroup label="Kategori" options={expenseCategories} value={category} onChange={setCategory} />
      </Variant>
      <Variant label="layout inline (dompet)" stack>
        <OptionGroup label="Sumber dana" layout="inline" options={paymentSources} value={source} onChange={setSource} />
      </Variant>
    </>
  )
}

export function RangeFieldDemo() {
  const [tenor, setTenor] = useState(6)
  return (
    <RangeField
      label="Tenor Pinjaman"
      valueLabel={`${tenor} Bulan`}
      value={tenor}
      min={1}
      max={24}
      onChange={setTenor}
      ticks={['1 Bulan', '12 Bulan', '24 Bulan']}
    >
      <ChipGroup
        label="Tenor cepat"
        size="sm"
        value={tenor}
        onChange={setTenor}
        options={[3, 6, 12, 24].map((months) => ({ value: months, label: `${months} Bln` }))}
      />
    </RangeField>
  )
}

export function DueDateFieldDemo() {
  const [today] = useState(() => new Date())
  const [dueDate, setDueDate] = useState(() => addDays(today, 30))
  return (
    <DueDateField
      label="Tenggat Pelunasan (Jatuh Tempo)"
      value={dueDate}
      onChange={setDueDate}
      today={today}
      presets={[
        { label: '1 Minggu', days: 7 },
        { label: '2 Minggu', days: 14 },
        { label: '1 Bulan', days: 30 },
      ]}
    />
  )
}
