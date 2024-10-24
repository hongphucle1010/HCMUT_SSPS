import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Content from '../pages/Content/Content'
import LogIn from '../pages/LogInSSO/LogIn'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import LogOut from '../components/LogOut/LogOut'
import Step1 from '../pages/Print/StepOne'
import Step2 from '../pages/Print/StepTwo'
import Map1 from '../pages/Print/Map1'
import Map2 from '../pages/Print/Map2'
import History from '../pages/History'
import Transaction from '../pages/History/Transaction'
import Statistic from '../pages/History/Statistic'
import HistoryLayout from '../layout/HistoryLayout/HistoryLayout'
import SignUp from '../pages/LogInSSO/SignUp'
import SpsoSignUp from '../pages/LogInSSO/SpsoSignUp'
import SpsoLogIn from '../pages/LogInSSO/SpsoLogIn'
import AdminLayout from '../layout/AdminLayout/AdminLayout'
import AdminLandingPage from '../pages/AdminLandingPage/AdminLandingPage'
import PrinterManagement from '../pages/PrinterManagement/PrinterManagement'
import ConfigurationPage from '../pages/ConfigurationPage/ConfigurationPage'
import StudentInfoPage from '../pages/StudentInfoPage/StudentInfoPage'
import TestingPage from '../pages/TestingPage/Test'

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
      path: '/settings',
      element: (
        <MainLayout>
          <StudentInfoPage />
        </MainLayout>
      )
    },
    {
      path: '/test',
      element: (
        <MainLayout>
          <TestingPage />
        </MainLayout>
      )
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
          element: <Step1 />
        },
        {
          path: 'step2',
          element: <Step2 />
        },
        {
          path: 'map1',
          element: <Map1 />
        },
        {
          path: 'map2',
          element: <Map2 />
        }
      ]
    },
    {
      path: '/history',
      element: (
        <HistoryLayout>
          <span></span>
        </HistoryLayout>
      ),
      children: [
        {
          path: '',
          element: <History />
        },
        {
          path: 'transaction',
          element: <Transaction />
        },
        {
          path: 'statistic',
          element: <Statistic />
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
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/spso/login',
      element: <SpsoLogIn />
    },
    {
      path: '/spso/signup',
      element: <SpsoSignUp />
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
        <AdminLayout>
          <AdminLandingPage />
        </AdminLayout>
      )
    },
    {
      path: '/printer',
      element: (
        <AdminLayout>
          <PrinterManagement />
        </AdminLayout>
      )
    },
    {
      path: '/configurations',
      element: (
        <AdminLayout>
          <ConfigurationPage />
        </AdminLayout>
      )
    },
    {
      path: '/logout',
      element: <LogOut />
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
