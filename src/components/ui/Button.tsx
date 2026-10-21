import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const variants = {
  primary: 'bg-primary-container text-on-primary shadow-xs hover:bg-primary',
  secondary: 'bg-surface-container-low text-primary hover:bg-surface-container',
  outline:
    'border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-high',
  ghost: 'text-primary hover:underline',
  danger: 'bg-error text-on-error shadow-xs hover:bg-error/90',
}

// Heights follow DESIGN.md: 56px for primary operations, never under 40px.
const sizes = {
  lg: 'min-h-14 gap-2 rounded-2xl px-6 text-label-lg font-bold',
  md: 'min-h-12 gap-2 rounded-xl px-5 text-label-md font-semibold',
  sm: 'min-h-10 gap-1.5 rounded-xl px-4 text-[13px] font-medium',
  xs: 'min-h-9 gap-1.5 rounded-lg px-3 text-label-sm',
}

const iconSizes = { lg: 24, md: 20, sm: 16, xs: 16 }

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  /** Material Symbols name shown before the label. */
  icon?: string
  iconFilled?: boolean
  fullWidth?: boolean
  /** Shows a spinner in place of the icon and blocks further clicks. */
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconFilled,
  fullWidth,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        sizes[size],
        variants[variant],
        variant === 'ghost' && 'min-h-0 px-2 py-1 shadow-none',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Icon name="progress_activity" size={iconSizes[size]} className="animate-spin" />
      ) : (
        icon && <Icon name={icon} filled={iconFilled} size={iconSizes[size]} />
      )}
      {children}
    </button>
  )
}
