import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const errorStatus = error?.response.status;
        if (errorStatus === 401) {
          await Swal.fire({
            icon: "warning",
            title: "Session expired",
            text: "Please login again to continue.",
            confirmButtonText: "OK",
            confirmButtonColor: "#004d40",
          });

          try {
            await logOutUser();
            await axiosInstance.post(
              "/api/logout",
              {},
              { withCredentials: true },
            );
            navigate("/auth/login", { state: location.pathname, replace: true });
          } catch {
            console.log(error);
          }
        }
        if (errorStatus === 403) {
          await Swal.fire({
            icon: "warning",
            title: "Forbidden access.",
            text: "This route is only for admins.",
            confirmButtonText: "OK",
            confirmButtonColor: "#004d40",
          });
          try {
            await logOutUser();
            await axiosInstance.post(
              "/api/logout",
              {},
              { withCredentials: true },
            );
            navigate("/auth/login", { state: location.pathname, replace: true });
          } catch (error) {
            console.log("Logout failed", error);
          }
        }
        if (errorStatus === 404) {
          await Swal.fire({
            icon: "warning",
            title: "Forbidden access.",
            text: "Your access token is corrupted. Please, login again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#004d40",
          });
          try {
            await logOutUser();
            await axiosInstance.post(
              "/api/logout",
              {},
              { withCredentials: true },
            );
            navigate("/auth/login", { state: location.pathname, replace: true });
          } catch (error) {
            console.log("Logout failed", error);
          }
        }
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [axiosInstance, location, navigate, logOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
