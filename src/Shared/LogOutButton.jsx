import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { sweetSuccess } from "../Utilities/alert";
import useAxios from "../Hooks/useAxios";

const LogOutButton = ({ onClick, className = "" }) => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { logOutUser } = useAuth();

  const handleLogOut = async () => {
    try {
      logOutUser().then(async () => {
        await axiosInstance.post("/api/logout", {}, { withCredentials: true });
        sweetSuccess("You have logged out successfully");
        navigate("/");
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      if (onClick) onClick();
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className={`btn btn-ghost justify-start w-full ${className}`}
    >
      <FiLogOut></FiLogOut>
      Logout
    </button>
  );
};

export default LogOutButton;
