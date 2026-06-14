import axiosInstance from "../lib/axiosInstance";

export const getMe = () => axiosInstance.get("auth/getMe");
