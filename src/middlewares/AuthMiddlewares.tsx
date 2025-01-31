import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddlewares = () => {
  const isAuth = true;
  if (!isAuth) {
    return (
      <div>
        <Navigate to={"/auth/login"} />
      </div>
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthMiddlewares;
