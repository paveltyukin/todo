import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { checkAuth } from './store/auth/actions'

const container = document.getElementById('root')!
const root = createRoot(container)

const main = async () => {
  await store.dispatch(checkAuth())

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
