import axiosInstance from "../../../lib/axiosInstance";

export const getMatchCommentary = (matchId) => {
  return axiosInstance.get(`/matches/${matchId}/commentary`);
};

export const createCommentary = (data) => {
  return axiosInstance.post("/admin/commentary", data);
};

export const deleteCommentary = (id) => {
  return axiosInstance.delete(`/admin/commentary/${id}`);
};
