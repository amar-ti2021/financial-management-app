import { useNavigate } from 'react-router'

/**
 * Back navigation that never leaves the app: steps back in history when the
 * user navigated here, otherwise goes to `fallback` (e.g. on a deep link).
 */
export function useGoBack(fallback = '/') {
  const navigate = useNavigate()
  return () => {
    const index = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (index > 0) navigate(-1)
    else navigate(fallback, { replace: true })
  }
}
