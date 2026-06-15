import axiosInstance from "../../../lib/axiosInstance";

export const login = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const register = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const getMe = () => {
  return axiosInstance.get("/auth/getMe");
};

export const logout = () => {
  return axiosInstance.post("/auth/logout");
};