import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'
import { getAuth } from '../store/auth/selectors'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const isAuth = useAppSelector(getAuth)

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
