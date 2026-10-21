import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'primary'

const soft: Record<BadgeTone, string> = {
  success: 'bg-secondary-container/40 text-on-secondary-container',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-error-container/70 text-on-error-container',
  neutral: 'bg-surface-container text-on-surface-variant',
  primary: 'bg-primary/10 text-primary',
}

const solid: Record<BadgeTone, string> = {
  success: 'bg-secondary-container text-on-secondary-container',
  warning: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
  danger: 'bg-error text-on-error',
  neutral: 'bg-inverse-surface text-inverse-on-surface',
  primary: 'bg-primary text-on-primary',
}

const sizes = {
  xs: { box: 'px-1.5 py-0.5 text-[10px]', icon: 12 },
  sm: { box: 'px-2 py-0.5 text-[11px]', icon: 13 },
  md: { box: 'px-2.5 py-1 text-label-sm', icon: 14 },
}

export type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
  variant?: 'soft' | 'solid'
  size?: keyof typeof sizes
  /** Material Symbols name before the label. */
  icon?: string
  /** Small leading status dot. */
  dot?: boolean
  bordered?: boolean
  shape?: 'pill' | 'rounded'
  className?: string
}

/** Static status pill: "Lunas", "Jatuh Tempo", "Aktif", "Rasio 22%". */
export function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'sm',
  icon,
  dot,
  bordered,
  shape = 'pill',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 font-semibold whitespace-nowrap',
        shape === 'pill' ? 'rounded-full' : 'rounded-md',
        sizes[size].box,
        (variant === 'soft' ? soft : solid)[tone],
        bordered && 'border border-current/25',
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {icon && <Icon name={icon} size={sizes[size].icon} />}
      {children}
    </span>
  )
}
