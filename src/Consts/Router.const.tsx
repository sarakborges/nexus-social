import { createBrowserRouter } from 'react-router'

import { ROUTES } from './Routes.const'

import { ProtectedRouteComponent } from '@/Components/System/ProtectedRoute'

import { HomeRoute } from '@/Routes/Home'
import { LoginRoute } from '@/Routes/Login'

const routeComponents = {
  home: HomeRoute,
  login: LoginRoute
}

const { LOGIN, ...protectedRoutes } = ROUTES

export const ROUTER = createBrowserRouter([
  {
    path: LOGIN.path,
    Component: routeComponents[LOGIN.id]
  },

  {
    element: <ProtectedRouteComponent />,
    children: [
      ...Object.keys({ ...protectedRoutes }).map((routeItem) => {
        const { path, id } = ROUTES[routeItem]

        return {
          path: path,
          Component: routeComponents[id]
        }
      })
    ]
  }
])
