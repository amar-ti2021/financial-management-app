import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import { IconTile, type IconTileTone } from './IconTile'

export type CalloutTone = 'neutral' | 'success' | 'info' | 'warning' | 'danger'

const tones: Record<CalloutTone, { box: string; icon: string; title: string; tile: IconTileTone }> = {
  neutral: {
    box: 'bg-surface-container-low/70 border-outline-variant/20',
    icon: 'text-primary',
    title: 'text-on-surface',
    tile: 'primary-soft',
  },
  success: {
    box: 'bg-emerald-50 border-emerald-200',
    icon: 'text-primary',
    title: 'text-primary',
    tile: 'primary',
  },
  info: {
    box: 'bg-secondary-container/30 border-secondary/20',
    icon: 'text-secondary',
    title: 'text-on-surface',
    tile: 'secondary',
  },
  warning: {
    box: 'bg-tertiary-fixed/30 border-tertiary-fixed-dim/40',
    icon: 'text-tertiary',
    title: 'text-tertiary',
    tile: 'tertiary',
  },
  danger: {
    box: 'bg-error-container/30 border-error/40',
    icon: 'text-error',
    title: 'text-error',
    tile: 'danger',
  },
}

export type CalloutProps = {
  icon: string
  tone?: CalloutTone
  title?: ReactNode
  children?: ReactNode
  /** `tile` puts the icon in a tinted circle; `plain` shows the bare glyph. */
  iconStyle?: 'tile' | 'plain'
  iconFilled?: boolean
  /** Right-hand slot, e.g. a risk badge. */
  aside?: ReactNode
  size?: 'sm' | 'md'
  /** Live-region role when the content changes with user input. */
  role?: 'status' | 'alert' | 'note'
  className?: string
}

/** Tip, notice or warning banner — "Tips Aman", "Rencana Pelunasan", risk level. */
export function Callout({
  icon,
  tone = 'neutral',
  title,
  children,
  iconStyle = 'plain',
  iconFilled,
  aside,
  size = 'md',
  role,
  className,
}: CalloutProps) {
  const style = tones[tone]
  return (
    <div
      role={role}
      className={cn(
        'flex items-start gap-3 border',
        size === 'sm' ? 'rounded-lg p-2 text-xs' : 'rounded-xl p-4',
        aside && 'items-center',
        style.box,
        className,
      )}
    >
      {iconStyle === 'tile' ? (
        <IconTile icon={icon} tone={style.tile} size={size === 'sm' ? 'xs' : 'md'} filled={iconFilled} />
      ) : (
        <Icon
          name={icon}
          filled={iconFilled}
          size={size === 'sm' ? 16 : 22}
          className={cn('mt-0.5', style.icon)}
        />
      )}
      <div className="min-w-0 flex-1 space-y-0.5">
        {title && <p className={cn('text-label-md font-bold', style.title)}>{title}</p>}
        {children && (
          <div className={cn('text-on-surface-variant', size === 'sm' ? 'text-xs' : 'text-body-sm')}>{children}</div>
        )}
      </div>
      {aside}
    </div>
  )
}
