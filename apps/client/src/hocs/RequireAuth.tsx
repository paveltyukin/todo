import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'
import { getAuth } from '../store/auth/selectors'

export function RequireAuth() {
  const location = useLocation()
  const isAuth = useAppSelector(getAuth)

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
