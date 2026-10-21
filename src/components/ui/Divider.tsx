import { cn } from '@/lib/cn'

export type DividerProps = {
  /** Text in the middle of the line, e.g. "atau". */
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (!label) return <hr className={cn('border-outline-variant/50', className)} />
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn('flex items-center gap-3 text-label-sm font-medium text-on-surface-variant', className)}
    >
      <span className="h-px flex-1 bg-outline-variant/60" />
      {label}
      <span className="h-px flex-1 bg-outline-variant/60" />
    </div>
  )
}
