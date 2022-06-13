import { useCheckAuthMutation } from '../store/auth/authAPI'
import { JSXElementTypes } from '../types'
import { Navigate, useLocation } from 'react-router-dom'

export const CheckAuth = ({ children }: JSXElementTypes): JSX.Element => {
  const location = useLocation()
  const [checkAuth, { isLoading, error, data }] = useCheckAuthMutation()

  checkAuth()

  if (isLoading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>err</div>
  }

  if (!data?.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
