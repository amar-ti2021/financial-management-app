import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type StickyFooterProps = {
  children: ReactNode
  className?: string
}

/** Action area pinned to the bottom of task screens (primary CTA + footnote). */
export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <footer
      className={cn(
        'sticky bottom-0 z-30 space-y-2.5 border-t border-outline-variant/20 bg-surface-container-lowest/95 px-4 pt-3 pb-4 shadow-dock backdrop-blur-md',
        className,
      )}
    >
      {children}
    </footer>
  )
}
