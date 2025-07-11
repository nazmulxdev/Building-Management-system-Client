import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { sweetSuccess } from "../Utilities/alert";

const LogOutButton = ({ onClick, className = "" }) => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();

  const handleLogOut = async () => {
    try {
      logOutUser().then(() => {
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
