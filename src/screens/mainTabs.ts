import type { BottomNavItem } from '@/components/layout'

/**
 * The app's main tabs for `BottomNav`, with `current` marked as the open one. Their pages don't
 * exist yet, so they don't link anywhere; give each a `to` once its page is built (Beranda:
 * `to: '/', end: true`) and NavLink takes over marking the current tab.
 */
export function mainTabs(current?: string): BottomNavItem[] {
  return [
    { label: 'Beranda', icon: 'home' },
    { label: 'Catat', icon: 'add_circle' },
    { label: 'Pinjaman', icon: 'credit_card' },
    { label: 'Kalkulator', icon: 'calculate' },
  ].map((tab) => ({ ...tab, active: tab.label === current }))
}
