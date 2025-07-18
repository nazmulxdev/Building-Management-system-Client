import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Utilities/LoadingSpinner";
import { Navigate } from "react-router";

const MembersRoutes = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { data: role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <LoadingSpinner isLoading={loading || roleLoading}></LoadingSpinner>;
  }

  if (!currentUser || role?.role !== "member") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
};

export default MembersRoutes;
