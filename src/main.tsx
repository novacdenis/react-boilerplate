import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { z } from "zod";

import zodErrorMap from "./lib/zod";
import { AppProvider } from "./providers";
import { router } from "./routes";

import "./lib/i18n";
import "./index.css";

z.setErrorMap(zodErrorMap);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
