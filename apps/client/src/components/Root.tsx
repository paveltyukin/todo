import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppDispatch, useAppSelector } from '../store'
import { setFingerprint } from '../store/auth/authSlice'

interface RootTypes {
  children: JSX.Element
}

export const Root = ({ children }: RootTypes): JSX.Element => {
  const dispatch = useAppDispatch()
  const selector = useAppSelector((state) => state.auth.fingerprint)

  useEffect(() => {
    const fpPromise = FingerprintJS.load()
    setTimeout(() => {
      fpPromise
        .then((fp) => fp.get())
        .then((result) => dispatch(setFingerprint(result.visitorId)))
    }, 1000)
  }, [dispatch])

  if (!selector) {
    return <div>loading</div>
  }

  return children
}
