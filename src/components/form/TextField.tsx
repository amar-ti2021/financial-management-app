import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Persistent label above the field — DESIGN.md forbids floating labels. */
  label: string
  /** Muted text after the label, e.g. "(Boleh dikosongkan)". */
  hint?: string
  trailingIcon?: string
}

export function TextField({ label, hint, trailingIcon, id, className, ...rest }: TextFieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-label-md text-on-surface">
        {label} {hint && <span className="font-normal text-on-surface-variant">{hint}</span>}
      </label>
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
        <input
          id={inputId}
          className={cn(
            'min-h-14 w-full bg-transparent py-3.5 pl-4 text-body-md text-on-surface outline-none placeholder:text-outline',
            trailingIcon ? 'pr-12' : 'pr-4',
          )}
          {...rest}
        />
        {trailingIcon && (
          <Icon
            name={trailingIcon}
            size={20}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-outline"
          />
        )}
      </div>
    </div>
  )
}
