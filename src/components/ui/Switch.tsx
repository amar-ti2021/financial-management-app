import { cn } from '@/lib/cn'

export type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  className?: string
}

export function Switch({ checked, onChange, label, disabled, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      // 48px hit area around a 44×24 track (DESIGN.md touch target rule).
      className={cn('inline-flex min-h-12 shrink-0 items-center disabled:opacity-50', className)}
    >
      <span
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-primary-container' : 'bg-outline-variant',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-xs transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </span>
    </button>
  )
}
