import type { ReactNode } from 'react'
import { IconTile, PageIntro } from '@/components/ui'
import { MobileShell } from './MobileShell'

export type AuthLayoutProps = {
  title: string
  description?: ReactNode
  children: ReactNode
  /** Pinned to the bottom, e.g. the link between Masuk and Daftar. */
  footer?: ReactNode
  className?: string
}

/** Frame for sign-in, sign-up and related screens: brand mark, heading, content, bottom link. */
export function AuthLayout({ title, description, children, footer, className }: AuthLayoutProps) {
  return (
    <MobileShell className={className}>
      <main className="flex flex-1 flex-col px-5 pt-10 pb-8">
        <div className="flex items-center gap-2.5">
          <IconTile icon="verified_user" tone="primary" shape="rounded" size="lg" filled />
          <span className="text-title-lg font-bold text-on-surface">Unbound</span>
        </div>
        <PageIntro title={title} description={description} className="mt-8" />
        <div className="mt-7 flex flex-col gap-5">{children}</div>
        {footer && <div className="mt-auto pt-8">{footer}</div>}
      </main>
    </MobileShell>
  )
}
