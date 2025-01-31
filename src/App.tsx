import React from "react";
import { Routes } from "react-router-dom";
import { publicRoutes } from "./router/publicRoutes";
import { privateRoutes } from "./router/privateRoutes";
import { coreRouters } from "./core/routers";

const App = () => {
  return (
    <Routes>
      {publicRoutes}
      {privateRoutes}
      {coreRouters}
    </Routes>
  );
};

export default App;
