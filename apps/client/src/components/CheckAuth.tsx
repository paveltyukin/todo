import { useCheckAuthMutation } from '../store/auth/authAPI'
import { useEffect } from 'react'
import { JSXElementTypes } from '../types'

export const CheckAuth = ({ children }: JSXElementTypes): JSX.Element => {
  const [checkAuth, { isLoading, error }] = useCheckAuthMutation()

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>err</div>
  }

  return children
}
