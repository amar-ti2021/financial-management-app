import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from '@/auth/AuthProvider'
import { GuestOnly } from '@/auth/GuestOnly'
import { PasswordChangeGate } from '@/auth/PasswordChangeGate'
import { AuthCallbackScreen } from '@/screens/AuthCallbackScreen'
import { ChangePasswordScreen } from '@/screens/ChangePasswordScreen'
import { ComponentGalleryScreen } from '@/screens/ComponentGalleryScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { RegisterScreen } from '@/screens/RegisterScreen'

// Routed for now: the component catalog and the auth screens. The design screens in
// src/screens/ are kept (and still type-checked); add their routes back here to show them.
const router = createBrowserRouter([
  {
    // Accounts on a temporary password are held at /ganti-kata-sandi until they change it.
    element: <PasswordChangeGate />,
    children: [
      { path: '/', element: <ComponentGalleryScreen /> },
      {
        element: <GuestOnly />,
        children: [
          { path: 'masuk', element: <LoginScreen /> },
          { path: 'daftar', element: <RegisterScreen /> },
        ],
      },
      { path: 'auth/callback', element: <AuthCallbackScreen /> },
      { path: 'ganti-kata-sandi', element: <ChangePasswordScreen /> },
      { path: '*', element: <Navigate to="/" replace /> },
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
