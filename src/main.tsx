import { RouterProvider } from 'react-router'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ROUTER } from './Consts/Router.const'

import './Assets/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
  </StrictMode>
)
