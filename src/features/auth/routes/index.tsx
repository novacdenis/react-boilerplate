import { RouteObject } from "react-router-dom";

import { Login } from "./Login";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
];
