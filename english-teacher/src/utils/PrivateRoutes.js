import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = { accessToken: null }   
  if(JSON.parse(localStorage.getItem("shipper"))) {
    auth.accessToken = JSON.parse(localStorage.getItem("shipper")).accessToken;
  }
  return auth.accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
