import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  /** Tier 1 surface: white, hairline border, ambient shadow. */
  elevated: 'border border-outline-variant/30 bg-surface-container-lowest shadow-card',
  outlined: 'border border-outline-variant/40 bg-surface-container-lowest',
  tonal: 'border border-outline-variant/30 bg-surface-container-low',
  plain: '',
}

const paddings = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-5' }
const radii = { md: 'rounded-xl', lg: 'rounded-2xl', xl: 'rounded-3xl' }

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article'
  variant?: keyof typeof variants
  padding?: keyof typeof paddings
  radius?: keyof typeof radii
}

export function Card({
  as: Tag = 'div',
  variant = 'elevated',
  padding = 'md',
  radius = 'lg',
  className,
  ...rest
}: CardProps) {
  return <Tag className={cn(variants[variant], paddings[padding], radii[radius], className)} {...rest} />
}
