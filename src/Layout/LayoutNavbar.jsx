import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
// import Map from "../Components/Map";
import MapEsri from "../Components/MapEsri";

const LayoutNavbar = () => {
  return (
    <div className="layout_navbar">
      <Navbar />
      <Outlet />
      <MapEsri />
    </div>
  );
};

export default LayoutNavbar;
