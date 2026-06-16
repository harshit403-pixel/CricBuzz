import axiosInstance from "../../../lib/axiosInstance";

export const getMatchCommentary = (matchId, params = {}) => {
  return axiosInstance.get(`/matches/${matchId}/commentary`, {
    params,
  });
};

export const createCommentary = (data) => {
  return axiosInstance.post("/admin/commentary", data);
};

export const deleteCommentary = (id) => {
  return axiosInstance.delete(`/admin/commentary/${id}`);
};
