import { useRoutes } from 'react-router-dom'
import { NotFound } from '../pages/NotFound'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Registration } from '../pages/Registration'
import { RequireAuth } from '../hocs/RequireAuth'
import { Profile } from '../pages/Profile'

const unauthorizedRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Registration /> },
]

const requireRoutes = [
  { path: '/', index: true, element: <Home /> },
  { path: 'profile', element: <Profile /> },
]

const requireRoutes2 = [
  { path: '/', index: true, element: <Home /> },
  { path: 'profile2', element: <Profile /> },
]

export const Router = () => {
  return useRoutes([
    ...unauthorizedRoutes,
    {
      path: '/',
      element: <RequireAuth />,
      children: requireRoutes,
    },
    { path: '*', element: <NotFound /> },
  ])
}
