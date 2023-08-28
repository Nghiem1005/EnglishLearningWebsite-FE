import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

const RequiredAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth?.user?.accessToken) {
    return children;
  }
  return <Navigate to={"/login"} state={{ path: location.pathname }} />;
};

export default RequiredAuth;
