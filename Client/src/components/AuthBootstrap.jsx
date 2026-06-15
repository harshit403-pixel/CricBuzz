import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "../features/auth/api/auth.api";

import {
  setUser,
  finishAuthLoading,
} from "../slices/userSlice";

function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  const { data, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (data?.data?.data) {
      dispatch(setUser(data.data.data));
    } else if (isError) {
      dispatch(finishAuthLoading());
    }
  }, [data, isError, dispatch]);

  return children;
}

export default AuthBootstrap;