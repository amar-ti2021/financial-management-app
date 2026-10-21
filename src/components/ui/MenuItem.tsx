import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type MenuItemProps = {
  icon: string
  title: ReactNode
  description?: ReactNode
  /** Right-hand slot before the chevron: badge, value, or a control like `Switch`. */
  trailing?: ReactNode
  /** Makes the whole row a button and shows a chevron. Omit when `trailing` is interactive. */
  onClick?: () => void
  tone?: 'default' | 'danger'
  className?: string
}

export function MenuItem({ icon, title, description, trailing, onClick, tone = 'default', className }: MenuItemProps) {
  const danger = tone === 'danger'
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full transition-transform',
            danger ? 'bg-error-container/50 text-error group-hover:scale-105' : 'bg-surface-container-low text-primary',
          )}
        >
          <Icon name={icon} size={20} />
        </span>
        <div className="min-w-0">
          <p className={cn('text-title-md', danger ? 'font-bold text-error' : 'font-semibold text-on-surface')}>
            {title}
          </p>
          {description && <p className="text-body-sm text-on-surface-variant">{description}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {trailing}
        {onClick && (
          <Icon name="chevron_right" className={danger ? 'text-error opacity-70' : 'text-outline-variant'} />
        )}
      </div>
    </>
  )

  const base = 'flex min-h-[58px] w-full items-center justify-between gap-3 px-4 py-3 text-left'

  if (!onClick) return <div className={cn(base, className)}>{content}</div>

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        'group rounded-2xl transition-colors duration-150',
        danger
          ? 'hover:bg-error-container/30 active:bg-error-container/50'
          : 'hover:bg-surface-container-low active:bg-surface-container',
        className,
      )}
    >
      {content}
    </button>
  )
}
