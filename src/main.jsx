import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Routers/Router";
import AuthProvider from "./Context/Auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import ThemeProvider from "./Context/Theme/ThemeProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={Router}></RouterProvider>
          </AuthProvider>
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
