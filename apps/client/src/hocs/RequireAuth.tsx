import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
