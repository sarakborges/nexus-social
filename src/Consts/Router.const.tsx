import { createBrowserRouter } from 'react-router'

import { ROUTES } from './Routes.const'

import { ProtectedRouteComponent } from '@/Components/System/ProtectedRoute'

import { HomeRoute } from '@/Routes/Home'
import { LoginRoute } from '@/Routes/Login'
import { RegisterRoute } from '@/Routes/Register'
import { ProfileFormRoute } from '@/Routes/ProfileForm'

const routeComponents = {
  home: HomeRoute,
  login: LoginRoute,
  register: RegisterRoute,
  'new-profile': ProfileFormRoute,
  'edit-profile': ProfileFormRoute
}

const { LOGIN, REGISTER, ...protectedRoutes } = ROUTES

export const ROUTER = createBrowserRouter([
  {
    path: LOGIN.path,
    Component: routeComponents[LOGIN.id]
  },

  {
    path: REGISTER.path,
    Component: routeComponents[REGISTER.id]
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
