import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Badge, Icon, IconTile, Money, type BadgeTone, type IconTileTone } from '@/components/ui'

export type DebtCardProps = {
  name: string
  /** "Kredivo / Akulaku", "Kredit Usaha Mikro" */
  provider: string
  icon: string
  iconTone?: IconTileTone
  badge?: { label: string; tone: BadgeTone; icon?: string }
  /** "Sisa Hutang Pokok" */
  remainingLabel: string
  remaining: number
  /** "Cicilan ke-2 dari 6x (Rp 275.000/bln)" */
  plan: ReactNode
  /** "18 Nov 2024" */
  dueDate: string
  /** "5 hari lagi" */
  dueNote: string
  /** "Bayar Sekarang", "Rincian" */
  actionLabel: string
  /** Due soon: amber frame, edge bar and warning icon. */
  urgent?: boolean
  onClick?: () => void
}

/** Debt list card: lender, status, remaining principal, plan and next due date. */
export function DebtCard({
  name,
  provider,
  icon,
  iconTone = 'primary-soft',
  badge,
  remainingLabel,
  remaining,
  plan,
  dueDate,
  dueNote,
  actionLabel,
  urgent = false,
  onClick,
}: DebtCardProps) {
  return (
    <article
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onClick()
        }
      }}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-xs transition hover:shadow-md active:scale-[0.99]',
        urgent ? 'border-2 border-amber-300' : 'border border-slate-200',
        onClick && 'cursor-pointer',
      )}
    >
      {urgent && <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />}

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <IconTile icon={icon} tone={urgent ? 'warning' : iconTone} size="lg" filled={urgent} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-title-md font-bold text-on-surface">{name}</h3>
              {badge && (
                <Badge tone={badge.tone} icon={badge.icon} bordered className="font-bold">
                  {badge.label}
                </Badge>
              )}
            </div>
            <p className="text-body-sm text-on-surface-variant">{provider}</p>
          </div>
        </div>
        <Icon name="chevron_right" className="text-outline transition group-hover:text-primary" />
      </div>

      <div
        className={cn(
          'mb-3 rounded-lg border p-2',
          urgent ? 'border-amber-200/80 bg-amber-50 text-amber-900' : 'border-slate-200/80 bg-slate-50',
        )}
      >
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <span className={cn('text-label-sm', urgent ? 'font-medium' : 'font-normal text-on-surface-variant')}>
            {remainingLabel}
          </span>
          <Money
            value={remaining}
            className={cn('text-title-lg font-bold', urgent ? 'text-amber-950' : 'text-on-surface')}
          />
        </div>
        <p className={cn('text-body-sm', !urgent && 'text-on-surface-variant')}>{plan}</p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <div className={cn('flex items-center gap-1.5', urgent ? 'text-amber-800' : 'text-on-surface-variant')}>
          <Icon name={urgent ? 'warning' : 'event'} size={18} className={urgent ? undefined : 'text-slate-500'} />
          <span className={cn('text-label-md', urgent ? 'font-bold' : 'text-on-surface')}>{dueDate}</span>
          <span
            className={cn(
              'text-label-sm',
              urgent ? 'rounded-sm bg-amber-100/80 px-2 py-0.5 text-amber-700' : 'font-normal text-slate-500',
            )}
          >
            {urgent ? dueNote : `(${dueNote})`}
          </span>
        </div>
        <span className="text-label-md font-bold text-primary group-hover:underline">{actionLabel}</span>
      </div>
    </article>
  )
}
