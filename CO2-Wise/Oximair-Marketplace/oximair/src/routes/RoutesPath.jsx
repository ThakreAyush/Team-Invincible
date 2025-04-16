import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateComponents from "../components/private/PrivateComponents";
function RoutesPath() {
  return (
    <Routes>
      <Route element={<PrivateComponents />}></Route>
    </Routes>
  );
}

export default RoutesPath;
