import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

const LogOutButton = ({ onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      alert("I am clicked");
      navigate("/");
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
