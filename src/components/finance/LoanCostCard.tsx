import { Badge, Icon, Money } from '@/components/ui'

export type LoanCostCardProps = {
  monthly: number
  total: number
  interest: number
  title?: string
}

/** Simulation result "Opsi A": what borrowing really costs. */
export function LoanCostCard({ monthly, total, interest, title = 'Opsi A: Mengambil Pinjaman' }: LoanCostCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border-2 border-outline-variant/80 bg-surface-container-lowest p-4 shadow-xs">
      <div className="pointer-events-none absolute top-0 right-0 -mt-6 -mr-6 size-24 rounded-full bg-error-container/20 blur-2xl" />
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-error-container text-error">
            <Icon name="credit_card" size={16} />
          </span>
          <h3 className="text-title-md font-bold text-on-surface">{title}</h3>
        </div>
        <Badge tone="danger" size="md">
          Beban Finansial
        </Badge>
      </div>

      <div className="mt-3 flex flex-col gap-1 rounded-xl border border-outline-variant/40 bg-surface-container-low p-2">
        <span className="text-label-sm text-on-surface-variant">Estimasi Cicilan per Bulan</span>
        <div className="flex items-baseline gap-1">
          <Money value={monthly} className="text-headline-md font-extrabold text-on-surface" />
          <span className="text-label-sm text-on-surface-variant">/bulan</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex flex-col gap-0.5 rounded-xl border border-outline-variant/40 bg-surface-bright p-2.5">
          <span className="text-on-surface-variant">Total Kembali (Pokok + Bunga)</span>
          <Money value={total} className="mt-1 text-title-md font-bold text-on-surface" />
          <span className="text-[11px] text-on-surface-variant">Wajib lunas selama tenor</span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-error-container bg-error-container/20 p-2.5">
          <span className="font-medium text-error">Total Bunga Hangus</span>
          <Money value={interest} className="mt-1 text-title-md font-bold text-error" />
          <span className="text-[11px] text-error/80">Biaya ekstra ke penyedia pinjaman</span>
        </div>
      </div>
    </article>
  )
}
