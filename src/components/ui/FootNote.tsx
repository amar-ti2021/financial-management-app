import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type FootNoteProps = {
  children: ReactNode
  icon?: string
  className?: string
}

/** Centered reassurance line under a primary action ("Data tercatat aman…"). */
export function FootNote({ children, icon = 'verified_user', className }: FootNoteProps) {
  return (
    <p
      className={cn(
        'flex items-center justify-center gap-1.5 px-2 text-center text-label-sm font-medium text-on-surface-variant',
        className,
      )}
    >
      <Icon name={icon} size={16} className="text-primary" />
      <span>{children}</span>
    </p>
  )
}
