import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Content from "../pages/Content/Content";

const Router: React.FC = () => {
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

  const routes = userRoutes;

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
