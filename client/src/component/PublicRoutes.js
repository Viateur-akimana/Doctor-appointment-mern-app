import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return Children.only(children);
  }
};

export default PublicRoutes;
