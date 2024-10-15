import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Content from '../pages/Content/Content'
import LogIn from '../pages/LogInSSO/LogIn'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import LogOut from '../components/LogOut/LogOut'

const Router: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.value.role)
  const userRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/logout',
      element: <LogOut />
    },
    {
      path: '/print',
      element: (
        <MainLayout>
          <span></span>
        </MainLayout>
      ),
      children: [
        {
          path: 'step1',
          element: <Content />
        },
        {
          path: 'step2',
          element: <Content />
        },
        {
          path: 'map1',
          element: <Content />
        },
        {
          path: 'map2',
          element: <Content />
        }
      ]
    },
    {
      path: '/history',
      element: (
        <MainLayout>
          <span></span>
        </MainLayout>
      ),
      children: [
        {
          path: '',
          element: <Content />
        },
        {
          path: 'transaction',
          element: <Content />
        },
        {
          path: 'statistic',
          element: <Content />
        }
      ]
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]

  const guestRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: <LogIn />
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]

  const adminRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]

  const routes = role === 'STUDENT' ? userRoutes : role === 'ADMIN' ? adminRoutes : guestRoutes

  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Router
