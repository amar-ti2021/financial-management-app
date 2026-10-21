import type { ReactNode } from 'react'

export type FloatingActionBarProps = {
  children: ReactNode
}

/** Full-width action docked just above the `BottomNav` ("+ Catat Hutang Baru"). */
export function FloatingActionBar({ children }: FloatingActionBarProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 mx-auto max-w-md px-4">
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}
