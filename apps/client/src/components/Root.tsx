import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppDispatch, useAppSelector } from '../store'
import { JSXElementTypes } from '../types'
import { setFingerprint } from '../store/auth/authSlice'
import { getFingerprint } from '../store/auth/selectors'

export const Root = ({ children }: JSXElementTypes): JSX.Element => {
  const dispatch = useAppDispatch()
  const fingerprint = useAppSelector(getFingerprint)

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => dispatch(setFingerprint(result.visitorId)))
  }, [dispatch])

  if (!fingerprint) {
    return <div>loading</div>
  }

  return children
}
