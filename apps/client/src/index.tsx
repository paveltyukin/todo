import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { setAuth, setFingerprint } from './store/auth/authSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Router } from './routes'
import { $api } from './api'
import { CheckAuthResponse } from './types'

const container = document.getElementById('root')!
const root = createRoot(container)

async function main() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  store.dispatch(setFingerprint(result.visitorId))

  const rest = await $api('/auth/check-auth')
  const res = (await rest.json()) as CheckAuthResponse

  if (!rest.ok) {
    store.dispatch(setAuth(false))
    localStorage.setItem('accessToken', '')
    localStorage.setItem('refreshToken', '')
  } else {
    store.dispatch(setAuth(true))
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
  }

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

main().catch((err) => console.error(err))
