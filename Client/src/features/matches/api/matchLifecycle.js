import axiosInstance from "../../../lib/axiosInstance";

export const updateToss = (id, data) => {
  return axiosInstance.patch(`/admin/matches/${id}/toss`, data);
};

export const startMatch = (id) => {
  return axiosInstance.patch(`/admin/matches/${id}/start`);
};

export const completeMatch = (id, data) => {
  return axiosInstance.patch(`/admin/matches/${id}/complete`, data);
};

export const selectPlayingXi = (id, data) => {
  return axiosInstance.post(`/admin/matches/${id}/playing-xi`, data);
};
