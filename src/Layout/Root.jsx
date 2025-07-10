import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";
import "../index.css";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <NavBar></NavBar>
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default Root;
