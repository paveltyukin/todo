import { useRoutes } from 'react-router-dom'
import { NotFound } from '../pages/NotFound'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Registration } from '../pages/Registration'
import { RequireAuth } from '../hocs/RequireAuth'
import { Profile } from '../pages/Profile'

export const Router = () => {
  return useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/registration', element: <Registration /> },
    {
      path: '/',
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
      children: [{ path: 'profile', element: <Profile /> }],
    },
    { path: '*', element: <NotFound /> },
  ])
}
