import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Registration } from './pages/Registration'
import { RequireAuth } from './hocs/RequireAuth'
import { setAccessToken, setAuth, setFingerprint } from './store/auth/authSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { CheckAuthResponse } from './types'
import axios from 'axios'

const container = document.getElementById('root')!
const root = createRoot(container)
async function main() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  store.dispatch(setFingerprint(result.visitorId))
  const response = (await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/check-auth`
  )) as CheckAuthResponse
  store.dispatch(setAuth(response.isAuth))
  store.dispatch(setAccessToken(response.accessToken))
  localStorage.setItem('refreshToken', response.refreshToken)

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
