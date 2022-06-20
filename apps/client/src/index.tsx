import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Root } from './components/Root'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Registration } from './pages/Registration'
import { RequireAuth } from './hocs/RequireAuth'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root>
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
      </Root>
    </Provider>
  </React.StrictMode>
)
