import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Pages/LogIn/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import Apartment from "../Pages/Apartment/Apartment";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/apartment",
        Component: Apartment,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: LoginPage,
      },
      {
        path: "/auth/register",
        Component: RegisterPage,
      },
    ],
  },
]);

export default Router;
