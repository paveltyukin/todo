import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useAppDispatch } from '../store'
import { JSXElementTypes } from '../types'
import { setFingerprint } from '../store/auth/authSlice'

export const Root = ({ children }: JSXElementTypes): JSX.Element => {
  const dispatch = useAppDispatch()
  const [fingerprint, setFingerprintLocal] = useState('')

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => setFingerprintLocal(result.visitorId))
  }, [])

  if (!fingerprint) {
    return <div>loading</div>
  }

  dispatch(setFingerprint(fingerprint))

  return children
}
