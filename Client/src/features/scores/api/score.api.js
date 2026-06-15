import axiosInstance from "../../../lib/axiosInstance";

export const createScore = (data) => {
  return axiosInstance.post("/admin/scores", data);
};

export const updateScore = (id, data) => {
  return axiosInstance.patch(`/admin/scores/${id}`, data);
};

export const getMatchScores = (matchId) => {
  return axiosInstance.get(`/admin/scores/match/${matchId}`);
};
