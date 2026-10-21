import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from '@/auth/AuthProvider'
import { GuestOnly } from '@/auth/GuestOnly'
import { AuthCallbackScreen } from '@/screens/AuthCallbackScreen'
import { ComponentGalleryScreen } from '@/screens/ComponentGalleryScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { RegisterScreen } from '@/screens/RegisterScreen'

// Routed for now: the component catalog and the auth screens. The design screens in
// src/screens/ are kept (and still type-checked); add their routes back here to show them.
const router = createBrowserRouter([
  { path: '/', element: <ComponentGalleryScreen /> },
  {
    element: <GuestOnly />,
    children: [
      { path: 'masuk', element: <LoginScreen /> },
      { path: 'daftar', element: <RegisterScreen /> },
    ],
  },
  { path: 'auth/callback', element: <AuthCallbackScreen /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
