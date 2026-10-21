import { useState, type ReactNode } from 'react'
import { Icon, IconButton, Money } from '@/components/ui'

export type DebtOverviewCardProps = {
  total: number
  /** "3 Pinjaman Aktif • Jatuh tempo terdekat dalam 5 hari" */
  summary: ReactNode
  /** "Status: Terkendali (Aman)" */
  statusLabel: string
  /** "Rasio 22%" */
  ratioLabel?: string
  label?: string
}

/** Gradient hero on the debt list: total owed, status shield and debt ratio. */
export function DebtOverviewCard({
  total,
  summary,
  statusLabel,
  ratioLabel,
  label = 'Total Hutang Keseluruhan',
}: DebtOverviewCardProps) {
  const [hidden, setHidden] = useState(false)

  return (
    <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary to-emerald-800 p-6 text-on-primary shadow-md">
      {/* Decorative protective rings */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 size-32 rounded-full border-8 border-white/10" />
      <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full border-4 border-white/5" />

      <div className="mb-1 flex items-center justify-between">
        <span className="text-label-sm tracking-wider text-on-primary-container uppercase">{label}</span>
        <IconButton
          variant="inverse"
          shape="rounded"
          className="bg-transparent text-on-primary-container"
          icon={hidden ? 'visibility_off' : 'visibility'}
          label={hidden ? 'Tampilkan total' : 'Sembunyikan total'}
          onClick={() => setHidden((value) => !value)}
        />
      </div>
      <p className="mb-2 text-display-mobile font-extrabold tracking-tight">
        <Money value={total} hidden={hidden} />
      </p>
      <p className="mb-4 flex items-center gap-1.5 text-body-sm font-medium text-white/90">
        <Icon name="info" size={16} className="text-secondary-fixed" />
        {summary}
      </p>
      <div className="flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-black/20 px-4 py-2.5 backdrop-blur-sm">
        <span className="flex items-center gap-2 text-label-md text-white">
          <Icon name="shield" filled size={20} className="text-secondary-fixed" />
          {statusLabel}
        </span>
        {ratioLabel && (
          <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-label-sm font-medium whitespace-nowrap text-on-primary-container">
            {ratioLabel}
          </span>
        )}
      </div>
    </section>
  )
}
