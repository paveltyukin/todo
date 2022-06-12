import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppSelector } from '../store'
import { JSXElementTypes } from '../types'
import { useCheckAuthMutation } from '../store/auth/authAPI'
import { Navigate } from 'react-router-dom'

export const Root = ({ children }: JSXElementTypes): JSX.Element => {
  const selector = useAppSelector((state) => state.auth.fingerprint)
  const [checkAuth, { isLoading, error, data }] = useCheckAuthMutation()

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => checkAuth({ fingerprint: result.visitorId }))
  }, [])

  if (!selector) {
    return <div>loading</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  if (!data?.isAuth) {
    return <Navigate to="/login" />
  }

  return children
}
