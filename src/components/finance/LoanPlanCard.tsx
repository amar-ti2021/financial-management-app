import { cn } from '@/lib/cn'
import { Icon, Money } from '@/components/ui'

const tagTones = {
  danger: 'bg-rose-50 text-rose-700',
  warning: 'bg-amber-50 text-amber-700',
}

const footerTones = {
  default: 'font-semibold text-slate-700',
  muted: 'text-slate-500',
  success: 'font-medium text-emerald-700',
}

export type LoanPlanCardProps = {
  /** Order in the source sheet; "-" when it has none. */
  order: number | string
  name: string
  tag?: { label: string; tone: keyof typeof tagTones }
  /** "Tanggal 11", "Tiap Gajian" */
  dueLabel: string
  /** "Rp 701 rb/bln" or a per-month breakdown. */
  installmentLabel: string
  total: number
  footerStart: string
  footerEnd: string
  footerStartTone?: keyof typeof footerTones
  footerEndTone?: keyof typeof footerTones
}

/** Row in the detailed loan list: installment, total and repayment window. */
export function LoanPlanCard({
  order,
  name,
  tag,
  dueLabel,
  installmentLabel,
  total,
  footerStart,
  footerEnd,
  footerStartTone = 'muted',
  footerEndTone = 'default',
}: LoanPlanCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 transition hover:border-emerald-300">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              {order}
            </span>
            <h3 className="truncate text-sm font-bold text-slate-900">{name}</h3>
            {tag && (
              <span className={cn('shrink-0 rounded-sm px-1.5 text-[10px] font-medium', tagTones[tag.tone])}>
                {tag.label}
              </span>
            )}
          </div>
          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            <Icon name="event" size={14} /> Jatuh Tempo: {dueLabel}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="block text-xs font-semibold text-rose-600">{installmentLabel}</span>
          <span className="text-[10px] text-slate-400">
            Total: <Money value={total} />
          </span>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[11px]">
        <span className={footerTones[footerStartTone]}>{footerStart}</span>
        <span className={cn('shrink-0', footerTones[footerEndTone])}>{footerEnd}</span>
      </div>
    </div>
  )
}
