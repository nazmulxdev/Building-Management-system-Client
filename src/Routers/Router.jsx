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
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import Announcement from "../Pages/Dashboard/Announcement/Announcement";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import MakePayment from "../Pages/Dashboard/Members/MakePayment";
import CheckoutPage from "../Pages/Dashboard/Members/CheckoutPage";
import PaymentHistory from "../Pages/Dashboard/Members/PaymentHistory";
import PrivateRoutes from "../Routes/PrivateRoutes";
import Forbidden from "../Routes/Forbidden";
import UsersRoutes from "../Routes/UsersRoutes";
import AdminRoutes from "../Routes/AdminRoutes";
import MembersRoutes from "../Routes/MembersRoutes";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import BlogPage from "../Pages/Blogs/BlogPage";
import Overview from "../Pages/Dashboard/Admin/Overview";

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
      {
        path: "/privacy-policies",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/blogs",
        element: (
          <PrivateRoutes>
            <BlogPage></BlogPage>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      // users routes
      {
        path: "/dashboard/user-profile",
        element: (
          <UsersRoutes>
            <UserProfile></UserProfile>
          </UsersRoutes>
        ),
      },
      {
        path: "/dashboard/announcements",
        Component: Announcement,
      },

      // members routes
      {
        path: "/dashboard/make-payments",
        element: (
          <MembersRoutes>
            <MakePayment></MakePayment>
          </MembersRoutes>
        ),
      },
      {
        path: "/dashboard/payments-history",
        element: (
          <MembersRoutes>
            <PaymentHistory></PaymentHistory>
          </MembersRoutes>
        ),
      },
      {
        path: "/dashboard/checkout/:id",
        element: (
          <MembersRoutes>
            <CheckoutPage></CheckoutPage>
          </MembersRoutes>
        ),
      },
      // admin routes
      {
        path: "/dashboard/manage-members",
        element: (
          <AdminRoutes>
            <ManageMembers></ManageMembers>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/overview",
        element: (
          <AdminRoutes>
            <Overview></Overview>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/agreement-requests",
        element: (
          <AdminRoutes>
            <AgreementRequest></AgreementRequest>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/make-announcement",
        element: (
          <AdminRoutes>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/manage-coupons",
        element: (
          <AdminRoutes>
            <ManageCoupons></ManageCoupons>
          </AdminRoutes>
        ),
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
  {
    path: "/forbidden",
    Component: Forbidden,
  },
]);

export default Router;
