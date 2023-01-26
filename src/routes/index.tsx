import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/features/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/auth/*",
    children: authRoutes,
  },
]);
