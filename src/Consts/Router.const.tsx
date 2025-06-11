import { createBrowserRouter } from 'react-router'

import { ROUTES } from './Routes.const'

import { ProtectedRouteComponent } from '@/Components/System/ProtectedRoute'

import { HomeRoute } from '@/Routes/Home'
import { LoginRoute } from '@/Routes/Login'
import { RegisterRoute } from '@/Routes/Register'
import { ProfileRoute } from '@/Routes/Profile'
import { EditProfileRoute } from '@/Routes/EditProfile'
import { CreateProfileRoute } from '@/Routes/CreateProfile'

const routeComponents = {
  home: HomeRoute,
  login: LoginRoute,
  register: RegisterRoute,
  'new-profile': CreateProfileRoute,
  'edit-profile': EditProfileRoute,
  profile: ProfileRoute
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
