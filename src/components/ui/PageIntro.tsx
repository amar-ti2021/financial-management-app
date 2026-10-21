import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type PageIntroProps = {
  title: ReactNode
  description?: ReactNode
  /** Small uppercase label above the title, with an icon chip. */
  eyebrow?: { icon: string; label: string }
  /** `display` for the greeting on Beranda, `headline` for tool pages. */
  size?: 'display' | 'headline'
  className?: string
}

/** Page opening: optional eyebrow, big title, one-line description. */
export function PageIntro({ title, description, eyebrow, size = 'headline', className }: PageIntroProps) {
  return (
    <section className={cn('flex flex-col gap-1', className)}>
      {eyebrow && (
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center rounded-lg bg-primary-fixed p-1.5 text-primary">
            <Icon name={eyebrow.icon} filled size={18} />
          </span>
          <span className="text-label-sm font-bold tracking-wider text-primary uppercase">{eyebrow.label}</span>
        </div>
      )}
      <h1
        className={cn(
          'font-extrabold tracking-tight text-on-surface',
          size === 'display' ? 'text-display-mobile' : 'text-headline-md',
        )}
      >
        {title}
      </h1>
      {description && (
        <p className={cn('text-on-surface-variant', size === 'display' ? 'text-body-md' : 'text-body-sm leading-relaxed')}>
          {description}
        </p>
      )}
    </section>
  )
}
