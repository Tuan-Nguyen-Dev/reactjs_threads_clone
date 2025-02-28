import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAuthProfile());
    document.body.classList.add("bg-[rgb(250,250,250)]");
  }, []);

  return (
    <div className="main-layout py-3 mx-auto flex">
      <Nav />
      <div className="flex w-[70%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
