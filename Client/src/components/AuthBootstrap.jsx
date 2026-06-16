import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "../features/auth/api/auth.api";

import {
  setUser,
  finishAuthLoading,
} from "../slices/userSlice";

const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(
    window.location.pathname,
  );

  const { data, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    enabled: !isPublicAuthRoute,
  });

  useEffect(() => {
    if (isPublicAuthRoute) {
      dispatch(finishAuthLoading());
      return;
    }

    if (data?.data?.data) {
      dispatch(setUser(data.data.data));
    } else if (isError) {
      dispatch(finishAuthLoading());
    }
  }, [data, isError, isPublicAuthRoute, dispatch]);

  return children;
}

export default AuthBootstrap;