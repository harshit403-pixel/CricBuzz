import axiosInstance from "../../../lib/axiosInstance";

export const getHomeData = () => {
  return axiosInstance.get("/home");
};
