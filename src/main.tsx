import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import { LoginPage } from "./pages/login/LoginPage";
import { useAuthStore } from "./store/app.store";
import { ResourceList } from "./pages/resourceList/ResourceList";
import { ResourceDetail } from "./pages/resourceData/ResourceDetail";

const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" />;
};

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/resourceslist",
        element: (
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
        ),
      },
      {
        path: "/resources/:id",
        element: (
          <PrivateRoute>
            <ResourceDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
