import { cn } from '@/lib/cn'
import { Money } from '@/components/ui'

/** `default` = heavy month (red total), `calm` = lighter month after the turning point. */
export type MonthVariant = 'default' | 'calm' | 'critical' | 'turning' | 'peak'

const variants: Record<
  MonthVariant,
  { box: string; divider: string; month: string; tag: string; pay: string; free: string; note: string; ribbon: string }
> = {
  default: {
    box: 'border border-slate-200 bg-white',
    divider: 'border-slate-100',
    month: 'text-slate-800',
    tag: 'bg-slate-100 font-medium text-slate-600',
    pay: 'font-bold text-rose-600',
    free: 'font-bold text-emerald-600',
    note: 'text-slate-500',
    ribbon: 'bg-slate-700',
  },
  calm: {
    box: 'border border-slate-200 bg-white',
    divider: 'border-slate-100',
    month: 'text-slate-800',
    tag: 'bg-slate-100 font-medium text-slate-600',
    pay: 'font-bold text-slate-700',
    free: 'font-bold text-emerald-600',
    note: 'text-slate-500',
    ribbon: 'bg-slate-700',
  },
  critical: {
    box: 'border-2 border-rose-300 bg-rose-50/50',
    divider: 'border-rose-200/60',
    month: 'text-rose-900',
    tag: 'bg-rose-100 font-bold text-rose-700',
    pay: 'font-extrabold text-rose-600',
    free: 'font-extrabold text-amber-700',
    note: 'text-slate-600',
    ribbon: 'bg-rose-600',
  },
  turning: {
    box: 'border-2 border-emerald-400 bg-emerald-50/70',
    divider: 'border-emerald-200',
    month: 'text-emerald-900',
    tag: 'bg-emerald-200 font-bold text-emerald-800',
    pay: 'font-extrabold text-slate-700',
    free: 'font-extrabold text-emerald-700',
    note: 'font-medium text-emerald-800',
    ribbon: 'bg-emerald-700',
  },
  peak: {
    box: 'border border-emerald-300 bg-emerald-50',
    divider: 'border-emerald-200',
    month: 'text-emerald-950',
    tag: 'bg-emerald-200 font-bold text-emerald-800',
    pay: 'font-bold text-emerald-900',
    free: 'text-base font-extrabold text-emerald-600',
    note: 'font-medium text-emerald-700',
    ribbon: 'bg-emerald-700',
  },
}

export type MonthProjectionCardProps = {
  /** "30-Okt", "Desember" */
  month: string
  /** "Bulan 3", "Kritis", "Lega!" */
  tag: string
  totalPay: number
  freeMoney: number
  /** Bottom line: which loans dominate the month. */
  note: string
  variant?: MonthVariant
  /** Floating label on the top edge, e.g. "Paling Berat". */
  ribbon?: string
  className?: string
}

/** One month in the horizontal cash-flow matrix: total to pay vs money left free. */
export function MonthProjectionCard({
  month,
  tag,
  totalPay,
  freeMoney,
  note,
  variant = 'default',
  ribbon,
  className,
}: MonthProjectionCardProps) {
  const style = variants[variant]
  return (
    <div
      className={cn(
        'relative flex min-w-[155px] snap-center flex-col justify-between space-y-2 rounded-xl p-3 shadow-xs',
        style.box,
        className,
      )}
    >
      {ribbon && (
        <span
          className={cn(
            'absolute -top-2 right-2 rounded-full px-1.5 text-[9px] leading-4 font-bold text-white',
            style.ribbon,
          )}
        >
          {ribbon}
        </span>
      )}
      <div>
        <div className={cn('flex items-center justify-between border-b pb-1.5', style.divider)}>
          <span className={cn('text-xs font-bold', style.month)}>{month}</span>
          <span className={cn('rounded-sm px-1.5 py-0.5 text-[9px]', style.tag)}>{tag}</span>
        </div>
        <dl className="mt-2 space-y-1.5">
          <div>
            <dt className="text-[10px] font-medium text-slate-500">Total Bayar</dt>
            <dd>
              <Money value={totalPay} className={cn('text-sm', style.pay)} />
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium text-slate-500">Uang Free</dt>
            <dd>
              <Money value={freeMoney} className={cn('text-sm', style.free)} />
            </dd>
          </div>
        </dl>
      </div>
      <p className={cn('border-t pt-2 text-[10px]', style.divider, style.note)}>{note}</p>
    </div>
  )
}
