import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type SegmentedOption<T> = {
  value: T
  label: string
  icon?: string
}

export type SegmentedControlProps<T> = {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}

/** Two-to-four equal tabs on a sunken track (e.g. "Matriks & Arus Kas" / "Daftar Pinjaman"). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn('grid gap-1 rounded-xl bg-slate-100/90 p-1 text-xs font-semibold', className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 transition',
              active ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800',
            )}
          >
            {option.icon && <Icon name={option.icon} size={16} />}
            <span className="truncate">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
