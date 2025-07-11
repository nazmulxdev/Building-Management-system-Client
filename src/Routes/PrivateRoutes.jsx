import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import PrivateRouteLoading from "../Utilities/PrivateRouteLoading";

const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <PrivateRouteLoading isLoading={loading}></PrivateRouteLoading>;
  }
  if (currentUser) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoutes;
