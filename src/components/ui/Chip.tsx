import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const sizes = {
  /** Compact pills under sliders. */
  sm: 'min-h-7 px-3 text-xs',
  /** Quick-amount / duration presets laid out in a grid. */
  md: 'min-h-11 px-1 py-2 text-label-sm',
  /** Filter tabs above lists. */
  lg: 'h-10 px-4 text-label-md',
}

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode
  selected?: boolean
  size?: keyof typeof sizes
  shape?: 'pill' | 'rounded'
  /** Tailwind background class for a leading status dot, e.g. `bg-tertiary-container`. */
  dotClassName?: string
}

/** Selectable chip. Selected state is solid primary; idle state is a quiet surface. */
export function Chip({
  children,
  selected = false,
  size = 'md',
  shape = 'pill',
  dotClassName,
  className,
  type = 'button',
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1.5 text-center whitespace-nowrap transition-all active:scale-95',
        shape === 'pill' ? 'rounded-full' : 'rounded-xl',
        sizes[size],
        selected
          ? 'bg-primary-container font-bold text-on-primary shadow-xs'
          : shape === 'pill'
            ? 'border border-outline-variant/40 bg-surface-container-lowest font-semibold text-on-surface-variant hover:bg-surface-container'
            : 'border border-outline-variant/30 bg-surface-container-low font-semibold text-on-surface hover:bg-surface-container',
        className,
      )}
      {...rest}
    >
      {dotClassName && <span className={cn('size-2 rounded-full', dotClassName)} />}
      {children}
    </button>
  )
}
