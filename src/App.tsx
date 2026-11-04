import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './pages/RootLayout'
import ItemsPage from './pages/ItemsPage'
import ItemDetailPage from './pages/ItemDetailPage'
import NewItemPage from './pages/NewItemPage'
import EditItemPage from './pages/EditItemPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [ß
      { index: true, Component: ItemsPage },
      { path: 'items/new', Component: NewItemPage },
      { path: 'items/:id', Component: ItemDetailPage },
      { path: 'items/:id/edit', Component: EditItemPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App