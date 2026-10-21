import { cn } from '@/lib/cn'
import { formatNumber, parseNumber } from '@/lib/format'
import { Icon } from '@/components/ui'

export type AmountInputProps = {
  value: number
  onChange: (value: number) => void
  id?: string
  /** Accessible name when there is no visible `<label htmlFor>`. */
  'aria-label'?: string
  /** Shows an × button that resets the amount to 0. */
  clearable?: boolean
  className?: string
}

/** Large Rupiah entry: fixed "Rp" prefix, numeric keypad, dot-grouped digits. */
export function AmountInput({ value, onChange, id, clearable, className, ...aria }: AmountInputProps) {
  const text = value ? formatNumber(value) : ''
  return (
    <div
      className={cn(
        'relative flex items-baseline justify-center gap-2 rounded-xl border-2 border-primary/20 bg-surface-container-low px-10 py-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim',
        className,
      )}
    >
      <span className="text-headline-md font-bold text-primary select-none">Rp</span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0"
        value={text}
        onChange={(event) => onChange(parseNumber(event.target.value))}
        // Grow with the number so "Rp" stays snug against it while centered.
        style={{ width: `${Math.max(text.length, 1) + 0.5}ch` }}
        className="max-w-full min-w-0 bg-transparent p-0 text-display-mobile text-primary tabular-nums outline-none placeholder:text-outline-variant"
        {...aria}
      />
      {clearable && value > 0 && (
        <button
          type="button"
          aria-label="Hapus nominal"
          onClick={() => onChange(0)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-outline transition-colors hover:text-on-surface"
        >
          <Icon name="cancel" size={20} />
        </button>
      )}
    </div>
  )
}
