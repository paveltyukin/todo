import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Registration } from './pages/Registration'
import { RequireAuth } from './hocs/RequireAuth'
import { checkAuth, setFingerprint } from './store/auth/authSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const container = document.getElementById('root')!
const root = createRoot(container)
async function main() {
  debugger
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  store.dispatch(setFingerprint(result.visitorId))
  store.dispatch(checkAuth())

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

main()
