import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { FaBan } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaBan className="icon_header" /> BOYCOTT
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
      <Link to={'/admin'} >
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        </Link>
        <Link to={'/admin/myproducts'} >
          <li className="sidebar-list-item">
            <a href="">
              <BsFillArchiveFill className="icon" /> Products
            </a>
          </li>
        </Link>
       
      </ul>
    </aside>
  );
}

export default Sidebar;
