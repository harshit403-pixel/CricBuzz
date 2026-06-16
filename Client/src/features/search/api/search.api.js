import axiosInstance from "../../../lib/axiosInstance";

export const searchPublicContent = (query) => {
  return axiosInstance.get("/search", {
    params: {
      q: query,
    },
  });
};
