import { useId, useState } from 'react'
import { Card, ChipGroup } from '@/components/ui'
import { formatCompact } from '@/lib/format'
import { AmountInput } from './AmountInput'

export type AmountFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  /** Quick-add amounts; each chip adds its value to the current amount. */
  presets?: number[]
  clearable?: boolean
  className?: string
}

/** Amount card used at the top of every "Catat" form: label, big input, quick-add chips. */
export function AmountField({ label, value, onChange, presets, clearable, className }: AmountFieldProps) {
  const id = useId()
  // Highlights the last chip tapped; typing by hand clears it.
  const [lastPreset, setLastPreset] = useState<number | null>(null)

  return (
    <Card padding="lg" className={className}>
      <label htmlFor={id} className="mb-2 block text-center text-label-md text-on-surface">
        {label}
      </label>
      <AmountInput
        id={id}
        value={value}
        clearable={clearable}
        onChange={(next) => {
          setLastPreset(null)
          onChange(next)
        }}
      />
      {presets && presets.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-center text-label-sm font-medium text-on-surface-variant">
            Pilihan cepat nominal:
          </p>
          <ChipGroup
            label="Pilihan cepat nominal"
            layout={4}
            shape="rounded"
            options={presets.map((preset) => ({ value: preset, label: `+${formatCompact(preset)}` }))}
            value={lastPreset}
            onChange={(preset) => {
              setLastPreset(preset)
              onChange(value + preset)
            }}
          />
        </>
      )}
    </Card>
  )
}
