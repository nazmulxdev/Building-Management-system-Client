import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";
import "../index.css";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="sticky top-0 z-50">
        <NavBar></NavBar>
      </div>

      <div className="flex-grow max-w-screen-2xl mx-auto w-full">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
