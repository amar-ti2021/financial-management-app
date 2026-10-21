import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

// Room kept free at the bottom so fixed bars never cover the last content row.
const insets = {
  none: '',
  nav: 'pb-28',
  'nav-action': 'pb-40',
}

export type MobileShellProps = {
  children: ReactNode
  /** Reserve space for a fixed `BottomNav` (and a `FloatingActionBar` above it). */
  bottomInset?: keyof typeof insets
  className?: string
}

/** Phone-width column (max 448px) that centers on larger screens. */
export function MobileShell({ children, bottomInset = 'none', className }: MobileShellProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background shadow-xs',
        insets[bottomInset],
        className,
      )}
    >
      {children}
    </div>
  )
}
