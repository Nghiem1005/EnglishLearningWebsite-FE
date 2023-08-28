import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

const UnRequiredAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth?.userExpireToken?.accessToken) {
    return children;
  }
  return <Navigate to={'/'}/>;
};

export default UnRequiredAuth;
