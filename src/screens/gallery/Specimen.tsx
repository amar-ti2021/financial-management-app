import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SpecimenCardProps = {
  name: string
  description: string
  children: ReactNode
}

/** One catalog entry: component name, what it is for, and its live variants. */
export function SpecimenCard({ name, description, children }: SpecimenCardProps) {
  return (
    <article id={name} className="scroll-mt-36 space-y-3">
      <header className="space-y-1">
        <h3 className="font-mono text-label-lg font-bold text-on-surface">{`<${name} />`}</h3>
        <p className="text-body-sm text-on-surface-variant">{description}</p>
      </header>
      {/* Links in previews are inert: their target screens are not routed. Buttons and inputs still work.
          React Router's Link skips navigation when the click was already default-prevented. */}
      <div
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest('a')) event.preventDefault()
        }}
        className="space-y-5 rounded-2xl border border-dashed border-outline-variant/70 bg-surface-container-low/50 p-4"
      >
        {children}
      </div>
    </article>
  )
}

export type VariantProps = {
  /** Which props this example shows, e.g. "variant · size". */
  label: string
  children: ReactNode
  /** Full-width column instead of a wrapping row. */
  stack?: boolean
  className?: string
}

export function Variant({ label, children, stack, className }: VariantProps) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">{label}</p>
      <div className={cn(stack ? 'flex flex-col gap-2' : 'flex flex-wrap items-center gap-2', className)}>
        {children}
      </div>
    </div>
  )
}

/**
 * Mini phone viewport for layout pieces. The transform makes this box the
 * containing block for `fixed` children, so bottom bars stay inside it.
 * It bleeds over the specimen padding so it is as wide as a small phone.
 */
export function PreviewFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative -mx-4 w-[calc(100%+2rem)] overflow-hidden border-y border-outline-variant/40 bg-background [transform:translateZ(0)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
