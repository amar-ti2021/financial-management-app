import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Chip, type ChipProps } from './Chip'

export type ChipOption<T> = {
  value: T
  label: ReactNode
  dotClassName?: string
}

const columns = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

export type ChipGroupProps<T> = {
  options: ChipOption<T>[]
  /** `null` when nothing is selected (e.g. a typed amount that matches no preset). */
  value: T | null
  onChange: (value: T) => void
  label: string
  /** `scroll` = one swipeable row; a number = equal-width grid. */
  layout?: 'scroll' | keyof typeof columns
  size?: ChipProps['size']
  shape?: ChipProps['shape']
  className?: string
}

/** Single-select row of chips: filters, quick amounts, tenor presets. */
export function ChipGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
  layout = 'scroll',
  size,
  shape,
  className,
}: ChipGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        layout === 'scroll'
          ? 'no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-0.5'
          : cn('grid gap-2', columns[layout]),
        className,
      )}
    >
      {options.map((option) => (
        <Chip
          key={option.value}
          role="radio"
          aria-checked={option.value === value}
          selected={option.value === value}
          size={size}
          shape={shape}
          dotClassName={option.dotClassName}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}
