import React from "react";
import "../styles/LayoutStyle.css";
import { SidebarMenu } from "../Data/data";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="log">
            <h6>DOCTOR APP</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu, index) => {
              return (
                <div className="menu-item" key={index}>
                  <i className={`fas ${menu.icon}`}></i>{" "}
                  {/* Use "fas" for Font Awesome Solid icons */}
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-container">
              <i class="fa-regular fa-bell"></i>
              <Link to="/profile">{user.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
