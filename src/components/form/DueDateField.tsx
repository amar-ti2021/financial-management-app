import { useRef } from 'react'
import { Button, Card, ChipGroup, IconTile } from '@/components/ui'
import { addDays, daysBetween, formatDateLong } from '@/lib/format'

export type DueDatePreset = {
  label: string
  days: number
}

export type DueDateFieldProps = {
  label: string
  value: Date
  onChange: (value: Date) => void
  presets?: DueDatePreset[]
  /** Reference date for the relative label and presets. */
  today: Date
}

function toInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function relativeLabel(days: number) {
  if (days === 0) return 'Hari ini'
  if (days === 1) return 'Besok'
  if (days < 0) return `Lewat ${-days} hari`
  return `${days} Hari lagi`
}

/** Big, plain due-date picker: relative + absolute date, "Ubah" opens the native picker. */
export function DueDateField({ label, value, onChange, presets, today }: DueDateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const days = daysBetween(today, value)

  const openPicker = () => {
    const input = inputRef.current
    if (!input) return
    if (typeof input.showPicker === 'function') input.showPicker()
    else input.focus()
  }

  return (
    <section className="space-y-2">
      <h2 className="text-label-lg font-bold text-on-surface">{label}</h2>
      <Card variant="outlined" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconTile icon="calendar_month" shape="rounded" className="bg-surface-container-low" />
            <div>
              <p className="text-title-md font-bold text-on-surface">{relativeLabel(days)}</p>
              <p className="text-body-sm text-on-surface-variant">{formatDateLong(value)}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={openPicker}>
            Ubah
          </Button>
          <input
            ref={inputRef}
            type="date"
            aria-label={label}
            className="sr-only"
            min={toInputValue(today)}
            value={toInputValue(value)}
            onChange={(event) => {
              if (event.target.value) onChange(new Date(`${event.target.value}T00:00:00`))
            }}
          />
        </div>
        {presets && (
          <ChipGroup
            label="Durasi cepat"
            layout={3}
            shape="rounded"
            options={presets.map((preset) => ({ value: preset.days, label: preset.label }))}
            value={presets.find((preset) => preset.days === days)?.days ?? null}
            onChange={(presetDays) => onChange(addDays(today, presetDays))}
          />
        )}
      </Card>
    </section>
  )
}
