import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

const tones = {
  danger: {
    box: 'border-red-200 bg-red-50 hover:bg-red-100',
    tile: 'bg-red-200/70 text-red-600',
    label: 'text-red-700',
  },
  success: {
    box: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100',
    tile: 'bg-emerald-200 text-emerald-800',
    label: 'text-emerald-800',
  },
  warning: {
    box: 'border-amber-200 bg-amber-50 hover:bg-amber-100',
    tile: 'bg-amber-200 text-amber-900',
    label: 'text-amber-900',
  },
}

export type QuickActionButtonProps = {
  to: string
  icon: string
  label: ReactNode
  tone: keyof typeof tones
}

/** Big thumb-friendly shortcut tile ("Catat Keluar", "Catat Masuk", "Catat Hutang"). */
export function QuickActionButton({ to, icon, label, tone }: QuickActionButtonProps) {
  const style = tones[tone]
  return (
    <Link
      to={to}
      className={cn(
        'flex min-h-24 flex-col items-center justify-center rounded-2xl border p-4 shadow-xs transition-all active:scale-95',
        style.box,
      )}
    >
      <span className={cn('mb-1 flex size-12 items-center justify-center rounded-full', style.tile)}>
        <Icon name={icon} size={26} />
      </span>
      <span className={cn('text-center text-label-md leading-tight font-bold', style.label)}>{label}</span>
    </Link>
  )
}
