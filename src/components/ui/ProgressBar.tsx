import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ProgressBarProps = {
  /** 0–100. */
  value: number
  label?: ReactNode
  valueLabel?: ReactNode
  className?: string
}

export function ProgressBar({ value, label, valueLabel, className }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('space-y-2', className)}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-on-surface-variant">{label}</span>
          <span className="font-semibold text-primary">{valueLabel}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-container"
      >
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
