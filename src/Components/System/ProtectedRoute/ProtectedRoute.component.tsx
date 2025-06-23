import { Navigate, Outlet } from 'react-router'

export const ProtectedRouteComponent = () => {
  const localStorageToken = localStorage.getItem('nexus-token')

  return !!localStorageToken ? <Outlet /> : <Navigate to="/login" replace />
}
