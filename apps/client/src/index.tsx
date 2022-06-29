import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { checkAuth, setFingerprint } from './store/auth/authSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Router } from './routes'

const container = document.getElementById('root')!
const root = createRoot(container)
async function main() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  store.dispatch(setFingerprint(result.visitorId))
  store.dispatch(checkAuth())

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

main().catch((err) => console.error(err))
