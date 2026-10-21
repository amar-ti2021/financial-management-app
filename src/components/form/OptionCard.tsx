import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, IconTile, type IconTileTone } from '@/components/ui'

const descriptionTones = {
  default: 'text-on-surface-variant',
  primary: 'font-medium text-primary',
  danger: 'text-error',
}

export type OptionCardProps = {
  icon: string
  title: ReactNode
  description?: ReactNode
  descriptionTone?: keyof typeof descriptionTones
  /** Icon tint while not selected (selected is always solid primary). */
  iconTone?: IconTileTone
  selected: boolean
  onSelect: () => void
  /** `stacked` = 2×2 category tile; `inline` = compact wallet row. */
  layout?: 'stacked' | 'inline'
}

/** Large radio card for categories, payment sources and lenders. */
export function OptionCard({
  icon,
  title,
  description,
  descriptionTone = 'default',
  iconTone = 'primary-soft',
  selected,
  onSelect,
  layout = 'stacked',
}: OptionCardProps) {
  const tile = <IconTile icon={icon} size="lg" shape={layout === 'inline' ? 'rounded' : 'circle'} tone={selected ? 'primary' : iconTone} />

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'relative rounded-2xl border p-4 text-left shadow-xs transition-all active:scale-[0.98]',
        selected
          ? 'border-primary bg-primary-fixed/20 ring-1 ring-primary'
          : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline',
        layout === 'stacked' ? 'flex min-h-[110px] flex-col justify-between gap-2' : 'flex min-h-16 items-center gap-3 p-3.5',
      )}
    >
      {layout === 'stacked' ? (
        <>
          <div className="flex w-full items-center justify-between">
            {tile}
            {selected && <Icon name="check_circle" filled size={22} className="text-primary" />}
          </div>
          <div>
            <p className="text-title-md leading-snug font-bold text-on-surface">{title}</p>
            {description && (
              <p className={cn('mt-0.5 text-body-sm leading-tight', descriptionTones[descriptionTone])}>
                {description}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {tile}
          <div className="min-w-0">
            <p className="truncate text-title-md leading-snug font-bold text-on-surface">{title}</p>
            {selected ? (
              <span className="text-label-sm font-bold text-primary">Terpilih</span>
            ) : (
              description && <span className="block truncate text-body-sm text-on-surface-variant">{description}</span>
            )}
          </div>
        </>
      )}
    </button>
  )
}
