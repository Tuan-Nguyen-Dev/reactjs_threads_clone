import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full p-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
