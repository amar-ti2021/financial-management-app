import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ComponentGalleryScreen } from '@/screens/ComponentGalleryScreen'

// Only the component catalog is routed for now. The design screens in src/screens/
// are kept (and still type-checked); add their routes back here to show them again.
// The router stays because components such as BottomNav and BrandHeader use links.
const router = createBrowserRouter([
  { path: '/', element: <ComponentGalleryScreen /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
