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
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        const handleLogout = async (msg) => {
          await Swal.fire({
            icon: "warning",
            title: msg.title,
            text: msg.text,
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
            navigate("/auth/login", {
              state: location.pathname,
              replace: true,
            });
          } catch (err) {
            console.error("Logout failed", err);
          }
        };

        if (status === 401) {
          await handleLogout({
            title: "Session expired",
            text: "Please login again to continue.",
          });
        } else if (status === 403) {
          await handleLogout({
            title: "Forbidden access.",
            text: "This route is only for admins.",
          });
        } else if (status === 404) {
          await handleLogout({
            title: "Invalid token",
            text: "Your access token is corrupted. Please login again.",
          });
        }

        return Promise.reject(error);
      },
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [axiosInstance, location, navigate, logOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
