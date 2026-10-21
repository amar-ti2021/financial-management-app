import { NavLink } from 'react-router'
import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'

export type BottomNavItem = {
  label: string
  icon: string
  /** Destination. Leave it out for a tab whose page doesn't exist yet: it shows but does nothing. */
  to?: string
  /** Only match the exact path (needed for `/`). */
  end?: boolean
  /** Marks a tab without `to` as the current one (tabs with `to` follow the URL). */
  active?: boolean
}

export type BottomNavProps = {
  items: BottomNavItem[]
}

const tabClass = (isActive: boolean, interactive: boolean) =>
  cn(
    'flex min-h-12 flex-col items-center justify-center rounded-xl px-2 py-1',
    interactive && 'transition-transform duration-150 active:scale-95',
    isActive
      ? 'bg-secondary-container/60 px-4 font-bold text-on-secondary-container'
      : cn('text-on-surface-variant', interactive && 'hover:bg-surface-container'),
  )

function TabContent({ item, isActive }: { item: BottomNavItem; isActive: boolean }) {
  return (
    <>
      <Icon name={item.icon} filled={isActive} />
      <span className="mt-0.5 text-label-md">{item.label}</span>
    </>
  )
}

/** Fixed tab bar (Tier 2 elevation). The active tab gets a tonal pill and a filled icon. */
export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav
      aria-label="Navigasi Utama"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex min-h-16 w-full max-w-md items-center justify-around border-t border-outline-variant/30 bg-surface-container-lowest px-2 pt-1 shadow-raised"
    >
      {items.map((item) =>
        item.to ? (
          <NavLink key={item.label} to={item.to} end={item.end} className={({ isActive }) => tabClass(isActive, true)}>
            {({ isActive }) => <TabContent item={item} isActive={isActive} />}
          </NavLink>
        ) : (
          <span
            key={item.label}
            aria-current={item.active ? 'page' : undefined}
            className={tabClass(!!item.active, false)}
          >
            <TabContent item={item} isActive={!!item.active} />
          </span>
        ),
      )}
    </nav>
  )
}
