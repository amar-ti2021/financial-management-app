import { useId, type ReactNode } from 'react'

export type RangeFieldProps = {
  label: string
  /** Small line under the label, e.g. "Per bulan (flat)". */
  hint?: string
  /** Current value as shown to the user, e.g. "Rp 2.000.000". */
  valueLabel: ReactNode
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  /** Reference labels spread under the track (min / mid / max). */
  ticks?: ReactNode[]
  /** Anything below the ticks: preset chips, a regulation note. */
  children?: ReactNode
}

/** Labelled slider with its live value on the right. */
export function RangeField({
  label,
  hint,
  valueLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
  ticks,
  children,
}: RangeFieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex flex-col">
          <label htmlFor={id} className="text-label-md font-bold text-on-surface">
            {label}
          </label>
          {hint && <span className="text-[11px] text-on-surface-variant">{hint}</span>}
        </div>
        <span className="text-title-lg font-extrabold text-primary tabular-nums">{valueLabel}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer"
      />
      {ticks && (
        <div className="flex justify-between gap-2 text-[11px] font-medium text-on-surface-variant">
          {ticks.map((tick, index) => (
            <span key={index}>{tick}</span>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}
