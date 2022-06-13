import { Navigate, useLocation } from 'react-router-dom'
import { useCheckAuthMutation } from '../store/auth/authAPI'
import { useEffect } from 'react'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const [checkAuth, { isLoading, error, data }] = useCheckAuthMutation()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <div>is loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  if (!data?.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
