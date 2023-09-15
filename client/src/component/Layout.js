import React from "react";
import { message } from "antd";
import "../styles/LayoutStyle.css";
import { userMenu, adminMenu } from "../Data/data";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const SidebarMenu = user.isAdmin ? userMenu : adminMenu;
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully");
    Navigate("/login");
  };
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
                  <i className={`fas ${menu.icon}`}></i>
                  {/* Use "fas" for Font Awesome Solid icons */}
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-container">
              <Badge
                count={user && user.notification.length}
                onClick={() => {
                  Navigate("/notification");
                }}
              >
                <Avatar shape="square" size="large" />
                <i class="fa-regular fa-bell"></i>
              </Badge>

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
