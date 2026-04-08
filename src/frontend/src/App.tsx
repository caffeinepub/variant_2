import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { Layout } from "./components/Layout";
import { Skeleton } from "./components/ui/skeleton";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Saved = lazy(() => import("./pages/Saved"));
const Drill = lazy(() => import("./pages/Drill"));
const Profile = lazy(() => import("./pages/Profile"));

const PageFallback = () => (
  <div className="space-y-4 p-4">
    <Skeleton className="h-32 w-full rounded-[20px]" />
    <Skeleton className="h-12 w-full rounded-[20px]" />
    <Skeleton className="h-48 w-full rounded-[20px]" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-center" richColors />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/saved",
  component: Saved,
});

const drillRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drill",
  component: Drill,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  savedRoute,
  drillRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
