import React from "react";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import UserProfile from "../Users/UserProfile";
import AdminProfile from "../Admin/AdminProfile";
import MemberProfile from "../Members/MemberProfile";

const DashboardHome = () => {
  const { data, roleLoading } = useRole();
  if (roleLoading) {
    return (
      <LoadingSpinner
        isLoading={roleLoading}
        fullScreen
        size="xl"
      ></LoadingSpinner>
    );
  }
  if (data?.role === "user") {
    return <UserProfile></UserProfile>;
  } else if (data?.role === "admin") {
    return <AdminProfile></AdminProfile>;
  } else if (data?.role === "member") {
    return <MemberProfile></MemberProfile>;
  }
};

export default DashboardHome;
