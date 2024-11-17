import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Comparisons from './Comparisons.tsx'
import ModelPage from './components/pages/ModelPage.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/charts/styles.css'
import '@mantine/core/styles.css'
import HomePage from './components/pages/HomePage.tsx'
import AggregatePage from './components/pages/AggregatePage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/comparisons",
    element: <Comparisons/>,
  },
  {
    path: "/models",
    element: <ModelPage/>,
  },
  {
    path: "/examples",
    element: <Comparisons/>,
  },
  {
    path: "/aggregates",
    element: <AggregatePage/>
  }
]) 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)