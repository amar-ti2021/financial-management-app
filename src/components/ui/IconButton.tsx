import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const variants = {
  ghost: 'text-on-surface-variant hover:bg-surface-container',
  tonal: 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high',
  brand: 'bg-primary/10 text-primary hover:bg-primary/15',
  inverse: 'bg-white/10 text-white hover:bg-white/20',
}

const sizes = {
  sm: { box: 'size-9', icon: 20 },
  md: { box: 'size-10', icon: 22 },
  lg: { box: 'size-12', icon: 24 },
}

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: string
  /** Accessible name; icon-only buttons must have one. */
  label: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  shape?: 'circle' | 'rounded'
  iconFilled?: boolean
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  iconFilled,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-all active:scale-95',
        shape === 'circle' ? 'rounded-full' : 'rounded-xl',
        sizes[size].box,
        variants[variant],
        className,
      )}
      {...rest}
    >
      <Icon name={icon} filled={iconFilled} size={sizes[size].icon} />
    </button>
  )
}
