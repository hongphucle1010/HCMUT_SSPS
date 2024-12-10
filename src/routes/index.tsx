import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Content from '../pages/Content/Content'
import LogIn from '../pages/LogInSSO/LogIn'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import LogOut from '../components/LogOut/LogOut'
// import Step1 from '../pages/Print/StepOne'
// import Step2 from '../pages/Print/StepTwo'
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
import GuestLayout from '../layout/GuestLayout/GuestLayout'
import PrintPage from '../pages/Print/PrintPage'
import PrinterManagementStudent from '../pages/PrinterManagement/PrintManagementStudent'
import OrderManagement from '../pages/OrderManagement/order'
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
          <PrintPage />
        </MainLayout>
      )
    },
    {
      path: '/manage',
      element: (
        <MainLayout>
          <PrinterManagementStudent />
        </MainLayout>
      )
    },
    {
      path: '/print/map1',
      element: (
        <MainLayout>
          <Map1 />
        </MainLayout>
      )
    },
    {
      path: '/print/map2',
      element: (
        <MainLayout>
          <Map2 />
        </MainLayout>
      )
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
        <GuestLayout>
          <Content />
        </GuestLayout>
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
      path: '/order-management',
      element: (
        <AdminLayout>
          <OrderManagement />
        </AdminLayout>
      )
    },
    {
      path: '/order-management',
      element: (
        <AdminLayout>
          <OrderManagement />
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
