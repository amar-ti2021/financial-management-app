import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { Card, Icon, IconTile, Money, type IconTileTone } from '@/components/ui'

export type DebtStatus = 'safe' | 'warning' | 'danger'

const statuses: Record<DebtStatus, { icon: string; tile: IconTileTone; text: string }> = {
  safe: { icon: 'check', tile: 'success', text: 'text-emerald-700' },
  warning: { icon: 'schedule', tile: 'warning', text: 'text-amber-700' },
  danger: { icon: 'warning', tile: 'danger', text: 'text-error' },
}

export type DebtStatusCardProps = {
  amount: number
  status: DebtStatus
  /** "(Aman & Bebas Hutang)" */
  statusLabel: string
  label?: string
  to?: string
}

/** One-line obligations summary on Beranda, linking to the debt list. */
export function DebtStatusCard({ amount, status, statusLabel, label = 'Status Kewajiban', to }: DebtStatusCardProps) {
  const style = statuses[status]
  const body = (
    <Card className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <IconTile icon={style.icon} tone={style.tile} size="lg" filled />
        <div className="flex min-w-0 flex-col">
          <span className="text-label-sm font-medium text-on-surface-variant">{label}</span>
          <div className="flex flex-wrap items-baseline gap-x-1">
            <Money value={amount} className="text-title-lg font-bold text-on-surface" />
            <span className={cn('text-label-sm font-bold', style.text)}>{statusLabel}</span>
          </div>
        </div>
      </div>
      {to && <Icon name="chevron_right" size={20} className="text-slate-400" />}
    </Card>
  )
  return to ? (
    <Link to={to} className="block rounded-2xl">
      {body}
    </Link>
  ) : (
    body
  )
}
