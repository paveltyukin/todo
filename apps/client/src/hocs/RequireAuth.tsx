import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'
import { useCheckAuthMutation } from '../store/auth/authAPI'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const [checkAuth, { isLoading, error }] = useCheckAuthMutation()

  if (!isAuth) {
    checkAuth()
    if (!isAuth) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  }

  return children
}
