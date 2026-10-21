import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const titleSizes = {
  sm: 'text-label-lg font-bold',
  md: 'text-title-md font-bold',
  lg: 'text-title-lg font-bold',
}

export type SectionHeaderProps = {
  title: ReactNode
  subtitle?: ReactNode
  /** Right-hand slot: hint text, a "Lihat Semua" button, a count badge. */
  aside?: ReactNode
  size?: keyof typeof titleSizes
  as?: 'h2' | 'h3'
  className?: string
}

export function SectionHeader({ title, subtitle, aside, size = 'md', as: Heading = 'h2', className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="min-w-0">
        <Heading className={cn('text-on-surface', titleSizes[size])}>{title}</Heading>
        {subtitle && <p className="text-label-sm font-normal text-on-surface-variant">{subtitle}</p>}
      </div>
      {typeof aside === 'string' ? (
        <span className="shrink-0 text-label-sm font-medium text-on-surface-variant">{aside}</span>
      ) : (
        aside
      )}
    </div>
  )
}
