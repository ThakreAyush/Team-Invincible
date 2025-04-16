import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponents() {
  const auth = localStorage.getItem("AuthUSerData");

  return <div>{auth ? <Outlet /> : <Navigate to={"/auth/login"} />}</div>;
}

export default PrivateComponents;
