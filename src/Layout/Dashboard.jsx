import { NavLink, Outlet } from "react-router";
import WebLogo from "../Shared/WebLogo";
import LogOutButton from "../Shared/LogOutButton";
import {
  FaUser,
  FaCog,
  FaMoneyBillWave,
  FaHistory,
  FaUserShield,
  FaUsersCog,
  FaBullhorn,
  FaFileContract,
  FaTicketAlt,
} from "react-icons/fa";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Utilities/LoadingSpinner";

const Dashboard = () => {
  const { data: role, roleLoading } = useRole();
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  const usersLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          end
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaUser className="text-lg" />
          <span>My Profile </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/announcements"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaCog className="text-lg" />
          <span>Announcement</span>
        </NavLink>
      </li>
    </>
  );

  const membersLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          end
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaUser className="text-lg" />
          <span>My Profile </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/make-payments"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaMoneyBillWave className="text-lg" />
          <span>Make Payment</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/payments-history"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaHistory className="text-lg" />
          <span>Payment History</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/announcements"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaCog className="text-lg" />
          <span>Announcement</span>
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          end
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaUserShield className="text-lg" />
          <span>Admin Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-members"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaUsersCog className="text-lg" />
          <span>Manage Members</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/make-announcement"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaBullhorn className="text-lg" />
          <span>Make Announcement</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/agreement-requests"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaFileContract className="text-lg" />
          <span>Agreement Requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-coupons"
          onClick={closeDrawer}
          className="flex items-center gap-2 font-semibold"
        >
          <FaTicketAlt className="text-lg" />
          <span>Manage Coupons</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <LoadingSpinner isLoading={roleLoading}>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Mobile navbar */}
          <div className="flex justify-between items-center bg-base-200 lg:hidden px-4 py-2">
            <WebLogo />
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-outline hover:btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          {/* Main content area */}
          <main className="flex-1 p-4 bg-base-100">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <div className="menu bg-base-200 text-base-content w-64 md:w-80 min-h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4">
              <WebLogo />
            </div>

            <div className="divider h-0.5 bg-primary my-0" />

            {/* Navigation Links */}
            <ul className="px-2 py-4 flex-1">
              {role?.role === "admin" && adminLinks}
              {role?.role === "user" && usersLinks}
              {role?.role === "member" && membersLinks}
            </ul>
            <div className="divider h-0.5 bg-primary my-0" />
            <div className="p-4">
              <LogOutButton className="text-primary hover:btn-primary hover:text-primary-content" />
            </div>
          </div>
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default Dashboard;
