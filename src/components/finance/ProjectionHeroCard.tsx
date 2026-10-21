import { cn } from '@/lib/cn'
import { Icon, Money } from '@/components/ui'

export type FreeMoneyMetric = {
  label: string
  /** Month the value occurs in, e.g. "Nov". */
  month: string
  amount: number
  note: string
}

export type ProjectionHeroCardProps = {
  /** "13 Pos Pinjaman Aktif" */
  activeLabel: string
  /** "Periode Okt - Sep" */
  periodLabel: string
  total: number
  footnote?: string
  lowest: FreeMoneyMetric
  peak: FreeMoneyMetric
  label?: string
}

function MetricBox({ metric, tone }: { metric: FreeMoneyMetric; tone: 'low' | 'peak' }) {
  const peak = tone === 'peak'
  return (
    <div
      className={cn(
        'rounded-xl border p-2.5',
        peak ? 'border-emerald-400/30 bg-emerald-500/15' : 'border-white/10 bg-white/5',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between text-[11px] font-medium',
          peak ? 'text-emerald-200' : 'text-slate-300',
        )}
      >
        <span>{metric.label}</span>
        <span className={cn('text-[10px] font-bold', peak ? 'text-emerald-300' : 'text-rose-300')}>{metric.month}</span>
      </div>
      <Money
        value={metric.amount}
        className={cn('mt-0.5 block text-base font-bold', peak ? 'text-emerald-300' : 'text-rose-300')}
      />
      <p className={cn('text-[10px]', peak ? 'text-emerald-200/80' : 'text-slate-400')}>{metric.note}</p>
    </div>
  )
}

/** Dark hero on the cash-flow projection: total remaining debt and free-money extremes. */
export function ProjectionHeroCard({
  activeLabel,
  periodLabel,
  total,
  footnote,
  lowest,
  peak,
  label = 'Total Seluruh Hutang Tersisa',
}: ProjectionHeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 p-5 text-white shadow-xl shadow-slate-900/10">
      <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-emerald-500/15 blur-2xl" />
      <div className="pointer-events-none absolute -top-6 -left-6 size-32 rounded-full bg-rose-500/10 blur-xl" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-1 text-[11px] font-semibold text-rose-300">
            <span className="size-1.5 animate-pulse rounded-full bg-rose-400" />
            {activeLabel}
          </span>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-300">
            {periodLabel}
          </span>
        </div>

        <div>
          <p className="text-xs font-medium tracking-wider text-slate-300 uppercase">{label}</p>
          <Money value={total} className="mt-0.5 block text-3xl font-extrabold tracking-tight" />
          {footnote && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-300">
              <Icon name="info" size={14} className="text-rose-300" />
              {footnote}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 pt-3">
          <MetricBox metric={lowest} tone="low" />
          <MetricBox metric={peak} tone="peak" />
        </div>
      </div>
    </section>
  )
}
