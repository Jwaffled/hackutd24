import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Comparisons from './Comparisons.tsx'
import ScatterChartDemo from './ScatterChartDemo.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/charts/styles.css'
import '@mantine/core/styles.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/comparisons",
    element: <Comparisons/>,
  },
  {
  path: "/ScatterChartDemo",
  element: <ScatterChartDemo/>,
  }
]) 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />    
      {/* <ScatterChartDemo/> */}
    </MantineProvider>
  </StrictMode>,
)