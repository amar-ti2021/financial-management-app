import { NavLink } from 'react-router'
import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'

export type BottomNavItem = {
  to: string
  label: string
  icon: string
  /** Only match the exact path (needed for `/`). */
  end?: boolean
}

export type BottomNavProps = {
  items: BottomNavItem[]
}

/** Fixed tab bar (Tier 2 elevation). The active tab gets a tonal pill and a filled icon. */
export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav
      aria-label="Navigasi Utama"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex min-h-16 w-full max-w-md items-center justify-around border-t border-outline-variant/30 bg-surface-container-lowest px-2 pt-1 shadow-raised"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              'flex min-h-12 flex-col items-center justify-center rounded-xl px-2 py-1 transition-transform duration-150 active:scale-95',
              isActive
                ? 'bg-secondary-container/60 px-4 font-bold text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-container',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} />
              <span className="mt-0.5 text-label-md">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
