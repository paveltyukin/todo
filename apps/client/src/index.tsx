import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { Root } from './components/Root'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Root>
    </Provider>
  </React.StrictMode>
)
