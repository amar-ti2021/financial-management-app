import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

export type TextFieldProps = Omit<ComponentProps<'input'>, 'size'> & {
  /** Persistent label above the field — DESIGN.md forbids floating labels. */
  label: string
  /** Muted text after the label, e.g. "(Boleh dikosongkan)". */
  hint?: string
  /** Guidance under the field, e.g. "Minimal 8 karakter". Replaced by `error` when set. */
  helper?: string
  /** Validation message; marks the field invalid. */
  error?: string
  /** Decorative icon on the right. */
  trailingIcon?: string
  /** Interactive control on the right, e.g. a show-password button. Wins over `trailingIcon`. */
  trailing?: ReactNode
}

export function TextField({
  label,
  hint,
  helper,
  error,
  trailingIcon,
  trailing,
  id,
  className,
  ...rest
}: TextFieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const messageId = `${inputId}-message`
  const message = error ?? helper

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-label-md text-on-surface">
        {label} {hint && <span className="font-normal text-on-surface-variant">{hint}</span>}
      </label>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-surface-container-lowest shadow-xs transition-all focus-within:ring-2 has-[input:read-only]:bg-surface-container-low has-[input:read-only]:shadow-none',
          error
            ? 'border-error focus-within:ring-error/20'
            : 'border-outline-variant/30 focus-within:border-primary focus-within:ring-primary-fixed-dim',
        )}
      >
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'min-h-14 w-full bg-transparent py-3.5 pl-4 text-body-md text-on-surface outline-none placeholder:text-outline read-only:text-on-surface-variant',
            trailing ? 'pr-14' : trailingIcon ? 'pr-12' : 'pr-4',
          )}
          {...rest}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>
        ) : (
          trailingIcon && (
            <Icon
              name={trailingIcon}
              size={20}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-outline"
            />
          )
        )}
      </div>
      {message && (
        <p
          id={messageId}
          className={cn('mt-1.5 flex items-start gap-1 text-body-sm', error ? 'text-error' : 'text-on-surface-variant')}
        >
          {error && <Icon name="error" filled size={18} className="mt-px" />}
          {message}
        </p>
      )}
    </div>
  )
}
