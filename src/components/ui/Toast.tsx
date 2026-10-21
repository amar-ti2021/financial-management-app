import { useEffect, useEffectEvent } from 'react'
import { Icon } from './Icon'

export type ToastProps = {
  /** Nothing renders while `null`. */
  message: string | null
  onDismiss: () => void
  icon?: string
  /** Auto-dismiss delay in ms. */
  duration?: number
}

/** Short confirmation pill at the top of the screen ("Pengeluaran Rp 25.000 tersimpan!"). */
export function Toast({ message, onDismiss, icon = 'check_circle', duration = 2500 }: ToastProps) {
  // Inline `onDismiss` callbacks must not restart the timer on every parent render.
  const dismiss = useEffectEvent(onDismiss)

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(dismiss, duration)
    return () => window.clearTimeout(timer)
  }, [message, duration])

  if (!message) return null

  return (
    <div
      role="status"
      className="fixed top-6 left-1/2 z-60 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl"
    >
      <Icon name={icon} filled size={22} className="text-secondary-fixed-dim" />
      {message}
    </div>
  )
}
