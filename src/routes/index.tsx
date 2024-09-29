import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Content from "../pages/Content/Content";
import LogIn from "../pages/LogInSSO/LogIn";
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

const Router: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.value.role);
  const userRoutes = [
    {
      path: "/",
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      ),
      errorElement: (
        <MainLayout>
          <ErrorPage />
        </MainLayout>
      ),
    },

    {
      path: "*",
      element: (
        <MainLayout>
          <ErrorPage />
        </MainLayout>
      ),
      errorElement: (
        <MainLayout>
          <ErrorPage />
        </MainLayout>
      ),
    },
  ];

  const guestRoutes = [
    {
      path: "/",
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ];

  const adminRoutes = [
    {
      path: "/",
      element: (
        <MainLayout>
          <Content />
        </MainLayout>
      ),
    },
  ];

  const routes =
    role === "STUDENT"
      ? userRoutes
      : role === "ADMIN"
      ? adminRoutes
      : guestRoutes;

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
