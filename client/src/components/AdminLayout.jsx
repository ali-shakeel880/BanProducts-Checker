import React, { useState } from "react";
import Header from "./AdminPanel/AdminHeader.jsx";
import Sidebar from "./AdminPanel/AdminSidebar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Outlet />
    </div>
    </>
  );
};

export default AdminLayout;
