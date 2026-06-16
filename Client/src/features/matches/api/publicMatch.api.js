import axiosInstance from "../../../lib/axiosInstance";

export const getMatchCenter = (id) => {
  return axiosInstance.get(`/matches/${id}/center`);
};

export const getMatchScorecard = (id) => {
  return axiosInstance.get(`/matches/${id}/scorecard`);
};
