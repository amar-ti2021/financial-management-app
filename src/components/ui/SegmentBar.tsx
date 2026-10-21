import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type Segment = {
  /** Relative weight; segments are sized by their share of the total. */
  value: number
  /** Tailwind background class, e.g. `bg-rose-400`. */
  colorClassName: string
  label?: ReactNode
  caption?: ReactNode
}

export type SegmentBarProps = {
  segments: Segment[]
  className?: string
}

/** Stacked horizontal bar with optional labels above and captions below each segment. */
export function SegmentBar({ segments, className }: SegmentBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  const columns = segments.map((segment) => `${segment.value}fr`).join(' ')
  const hasLabels = segments.some((segment) => segment.label)
  const hasCaptions = segments.some((segment) => segment.caption)

  return (
    <div className={cn('space-y-1.5', className)}>
      {hasLabels && (
        <div className="grid gap-2 text-[11px] font-semibold" style={{ gridTemplateColumns: columns }}>
          {segments.map((segment, index) => (
            <span key={index}>{segment.label}</span>
          ))}
        </div>
      )}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={cn('h-full', segment.colorClassName)}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>
      {hasCaptions && (
        <div className="grid gap-2 text-[10px] text-slate-500" style={{ gridTemplateColumns: columns }}>
          {segments.map((segment, index) => (
            <span key={index}>{segment.caption}</span>
          ))}
        </div>
      )}
    </div>
  )
}
