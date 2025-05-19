import { Navigate, Outlet } from 'react-router'

export const ProtectedRouteComponent = () => {
  const localStorageToken = localStorage.getItem('nexus-token')
  const userId = localStorage.getItem('user-id')

  return !!localStorageToken && !!userId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}
