import { Toaster } from "@/components/ui/toaster";
import { Routes } from "react-router-dom";
import { coreRouters } from "./core/routers";
import { privateRoutes } from "./router/privateRoutes";
import { publicRoutes } from "./router/publicRoutes";

const App = () => {
  return (
    <>
      <Routes>
        {publicRoutes}
        {privateRoutes}
        {coreRouters}
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
