import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppDispatch, useAppSelector } from '../store'
import { CheckAuthResponse, JSXElementTypes } from '../types'
import {
  setAccessToken,
  setAuth,
  setFingerprint,
} from '../store/auth/authSlice'
import { getFingerprint } from '../store/auth/selectors'
import { useCheckAuthMutation } from '../store/auth/authAPI'

export const Root = ({ children }: JSXElementTypes): JSX.Element => {
  const dispatch = useAppDispatch()
  const fingerprint = useAppSelector(getFingerprint)
  const [checkAuth, { isLoading }] = useCheckAuthMutation()

  useEffect(() => {
    ;(async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      dispatch(setFingerprint(result.visitorId))
      const response = (await checkAuth().unwrap()) as CheckAuthResponse
      dispatch(setAuth(response.isAuth))
      dispatch(setAccessToken(response.accessToken))
      localStorage.setItem('refreshToken', response.refreshToken)
    })()
  }, [])

  if (!fingerprint || isLoading) {
    return <div>loading</div>
  }

  return children
}
