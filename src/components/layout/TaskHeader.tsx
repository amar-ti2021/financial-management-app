import type { ReactNode } from 'react'
import { Icon } from '@/components/ui'
import { useGoBack } from '@/hooks/useGoBack'

export type TaskHeaderProps = {
  title: string
  /** Text next to the back chevron: "Batal" for forms, "Kembali" for detail pages. */
  backLabel?: string
  /** Defaults to going back in history, or home on a deep link. */
  onBack?: () => void
  /** Right-hand slot, usually a help `IconButton`. */
  action?: ReactNode
}

/** Header for focused task screens (forms, details): text back button, centered title. */
export function TaskHeader({ title, backLabel = 'Batal', onBack, action }: TaskHeaderProps) {
  const goBack = useGoBack()
  return (
    // Flex, not a 1fr/auto/1fr grid: equal side columns squeeze long titles into two lines on 360px phones.
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 bg-surface/95 px-4 backdrop-blur-md">
      <button
        type="button"
        onClick={onBack ?? goBack}
        className="-ml-2 inline-flex min-h-12 shrink-0 items-center gap-1 rounded-xl px-2 text-label-lg text-on-surface-variant transition-transform hover:text-primary active:scale-95"
      >
        <Icon name="arrow_back_ios_new" size={20} />
        {backLabel}
      </button>
      <h1 className="min-w-0 flex-1 truncate text-center text-headline-sm font-bold tracking-tight text-on-surface">
        {title}
      </h1>
      <div className="flex shrink-0">
        {action ?? (
          // Same width as the back button, so the title stays centred without an action.
          <span aria-hidden className="invisible -mr-2 inline-flex items-center gap-1 px-2 text-label-lg">
            <Icon name="arrow_back_ios_new" size={20} />
            {backLabel}
          </span>
        )}
      </div>
    </header>
  )
}
