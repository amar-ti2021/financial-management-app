import type { ReactNode } from 'react'

export type MenuGroupProps = {
  title: string
  children: ReactNode
  className?: string
}

/** Titled card of `MenuItem`s separated by hairlines (settings lists). */
export function MenuGroup({ title, children, className }: MenuGroupProps) {
  return (
    <section className={className}>
      <h3 className="mb-2 px-2 text-label-md font-bold tracking-wider text-on-surface-variant uppercase">{title}</h3>
      <div className="divide-y divide-surface-container rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-1 shadow-xs">
        {children}
      </div>
    </section>
  )
}
