import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { useAuthStore } from "./store/app.store";

// ✅ Correct Lazy Imports (Ensure Each File Has a Default Export)
const Landing = React.lazy(() => import("./pages/landing/Landing"));
const LoginPage = React.lazy(() => import("./pages/login/LoginPage"));
const ResourceList = React.lazy(
  () => import("./pages/resourceList/ResourceList")
);
const ResourceDetail = React.lazy(
  () => import("./pages/resourceData/ResourceDetail")
);
console.log(ResourceDetail);

// ✅ Private Route Wrapper (Ensure It Returns JSX)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

// ✅ Error Boundary (Ensure It Returns Valid JSX)
const ErrorBoundary = () => {
  const error = useRouteError();
  console.error("Route Error:", error);
  return <div>⚠️ Something went wrong! Please try again.</div>;
};

// ✅ Define Routes Properly
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, // ✅ Handles Page Errors
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "/resourceslist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <ResourceList />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/resources/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <ResourceDetail />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);

// ✅ QueryClient Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

// ✅ Render Application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
