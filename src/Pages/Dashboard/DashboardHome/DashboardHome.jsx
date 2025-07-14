import React from "react";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import UserProfile from "../Users/UserProfile";
import AdminProfile from "../Admin/AdminProfile";
import MemberProfile from "../Members/MemberProfile";

const DashboardHome = () => {
  const { role, roleLoading } = useRole;
  if (roleLoading) {
    return <LoadingSpinner isLoading={roleLoading}></LoadingSpinner>;
  }
  if (role === "user") {
    return UserProfile;
  } else if (role === "admin") {
    return AdminProfile;
  } else if (role === "member") {
    return MemberProfile;
  }
};

export default DashboardHome;
