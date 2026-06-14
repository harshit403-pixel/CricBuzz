import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { getMe } from "../api/auth.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: pathname !== "/login",
    retry: false,
  });

  useEffect(() => {
    if (data && data?.data.data) {
      console.log(data);
      dispatch(setUser(data?.data?.data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
