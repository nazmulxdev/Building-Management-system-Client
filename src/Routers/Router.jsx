import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../Pages/LogIn/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import Apartment from "../Pages/Apartment/Apartment";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from "../404-Error-Pages/ErrorPage";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers";
import UserProfile from "../Pages/Dashboard/Users/UserProfile";
import AgreementRequest from "../Pages/Dashboard/Admin/AgreementRequest";

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
        element: <Apartment></Apartment>,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/user-profile",
        Component: UserProfile,
      },
      {
        path: "/dashboard/agreement-requests",
        Component: AgreementRequest,
      },
      {
        path: "/dashboard/manage-members",
        Component: ManageMembers,
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
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default Router;
