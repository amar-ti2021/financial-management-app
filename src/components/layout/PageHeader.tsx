import type { ReactNode } from 'react'
import { IconButton } from '@/components/ui'
import { useGoBack } from '@/hooks/useGoBack'
import { cn } from '@/lib/cn'

export type PageHeaderProps = {
  title: string
  subtitle?: ReactNode
  /** Defaults to going back in history, or home on a deep link. Pass `false` to hide the button. */
  onBack?: (() => void) | false
  /** Right-hand slot for one or more `IconButton`s. */
  actions?: ReactNode
  /** Extra row under the title bar, e.g. a `SegmentedControl`. */
  children?: ReactNode
  className?: string
}

/** Header for list / overview pages: icon back button, left-aligned title and subtitle. */
export function PageHeader({ title, subtitle, onBack, actions, children, className }: PageHeaderProps) {
  const goBack = useGoBack()
  return (
    <header className={cn('sticky top-0 z-40 bg-surface-container-lowest/95 shadow-xs backdrop-blur-md', className)}>
      <div className="flex min-h-16 items-center justify-between gap-2 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          {onBack !== false && (
            <IconButton
              icon="arrow_back"
              label="Kembali"
              size="lg"
              shape="rounded"
              className="-ml-2 text-on-surface"
              onClick={onBack ?? goBack}
            />
          )}
          <div className="min-w-0">
            <h1 className="truncate text-title-lg font-bold tracking-tight text-on-surface">{title}</h1>
            {subtitle && <p className="text-label-sm font-medium text-on-surface-variant">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </div>
      {children && <div className="px-4 pb-2.5">{children}</div>}
    </header>
  )
}
