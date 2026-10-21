import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from '@/auth/AuthProvider'
import { GuestOnly } from '@/auth/GuestOnly'
import { PasswordChangeGate } from '@/auth/PasswordChangeGate'
import { RequireAuth } from '@/auth/RequireAuth'
import { AuthCallbackScreen } from '@/screens/AuthCallbackScreen'
import { ChangePasswordScreen } from '@/screens/ChangePasswordScreen'
import { ComponentGalleryScreen } from '@/screens/ComponentGalleryScreen'
import { DashboardScreen } from '@/screens/DashboardScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { RegisterScreen } from '@/screens/RegisterScreen'

// Routed for now: Beranda, the component catalog and the auth screens. Add new pages
// inside RequireAuth.
const router = createBrowserRouter([
  {
    // Accounts on a temporary password are held at /ganti-kata-sandi until they change it.
    element: <PasswordChangeGate />,
    children: [
      // Open to guests: signing in, and the return point of Google and email links.
      {
        element: <GuestOnly />,
        children: [
          { path: 'masuk', element: <LoginScreen /> },
          { path: 'daftar', element: <RegisterScreen /> },
        ],
      },
      { path: 'auth/callback', element: <AuthCallbackScreen /> },
      // Every other page needs a signed-in user.
      {
        element: <RequireAuth />,
        children: [
          { path: '/', element: <DashboardScreen /> },
          { path: 'komponen', element: <ComponentGalleryScreen /> },
          { path: 'ganti-kata-sandi', element: <ChangePasswordScreen /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
