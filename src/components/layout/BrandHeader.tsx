import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Avatar } from '@/components/ui'

export type BrandHeaderProps = {
  userName: string
  avatarSrc?: string
  /** Where tapping the avatar goes (usually the profile). */
  profileTo?: string
  title?: string
  /** Line under the brand name, e.g. a "Keuangan Aman" status. */
  subtitle?: ReactNode
  /** Right-hand slot, usually an `IconButton`. */
  action?: ReactNode
}

/** Top app bar for main tabs: avatar, brand, status line, one action. */
export function BrandHeader({
  userName,
  avatarSrc,
  profileTo = '/profil',
  title = 'Unbound',
  subtitle,
  action,
}: BrandHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface/95 px-4 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-2">
        <Link to={profileTo} aria-label="Buka profil" className="rounded-full">
          <Avatar name={userName} src={avatarSrc} />
        </Link>
        <div className="flex min-w-0 flex-col">
          <span className="text-title-lg font-bold text-on-surface">{title}</span>
          {subtitle && <span className="text-label-sm text-primary">{subtitle}</span>}
        </div>
      </div>
      {action}
    </header>
  )
}
