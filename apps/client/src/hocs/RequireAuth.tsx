import { Navigate, useLocation } from 'react-router-dom'
import { useCheckAuthMutation } from '../store/auth/authAPI'
import { useEffect } from 'react'
import { setAuth } from '../store/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { getAuth } from '../store/auth/selectors'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const [checkAuth, { isLoading, error }] = useCheckAuthMutation()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getAuth)

  useEffect(() => {
    checkAuth().then((data) => {
      dispatch(setAuth(true))
    })
  }, [checkAuth, dispatch])

  if (isLoading) {
    return <div>is loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
