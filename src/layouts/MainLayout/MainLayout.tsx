import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAuthProfile());
  }, []);
  return (
    <div className="main-layout mx-auto w-[80%] py-3">
      <Outlet />
    </div>
  );
};

export default MainLayout;
