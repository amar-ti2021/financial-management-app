import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type StatTileProps = {
  label: ReactNode
  value: ReactNode
  /** Small muted text after the value ("/ bln", "(1 Thn)"). */
  suffix?: ReactNode
  /** Material Symbols name shown before the label. */
  icon?: string
  /** Line under the value, e.g. a trend with its own icon. */
  footer?: ReactNode
  /** `sm` for dense bento grids, `lg` for headline metrics. */
  size?: 'sm' | 'lg'
  variant?: 'card' | 'tonal'
  valueClassName?: string
  className?: string
}

export function StatTile({
  label,
  value,
  suffix,
  icon,
  footer,
  size = 'sm',
  variant = 'card',
  valueClassName,
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between p-3.5',
        variant === 'card'
          ? 'rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-xs'
          : 'rounded-2xl bg-surface-container-low/70',
        className,
      )}
    >
      <div className={cn('flex items-center gap-2 text-on-surface-variant', size === 'sm' ? 'mb-1.5' : 'mb-1')}>
        {icon && <Icon name={icon} size={16} className="text-primary" />}
        <span className="text-label-sm font-medium">{label}</span>
      </div>
      <p
        className={cn(
          'font-bold text-on-surface tabular-nums',
          size === 'sm' ? 'text-[15px] leading-6' : 'text-title-lg tracking-tight whitespace-nowrap sm:text-headline-sm',
          valueClassName,
        )}
      >
        {value} {suffix && <span className="text-[11px] font-normal text-on-surface-variant">{suffix}</span>}
      </p>
      {footer && <div className="mt-1 flex items-center gap-0.5 text-label-sm font-semibold">{footer}</div>}
    </div>
  )
}
