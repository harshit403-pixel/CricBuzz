import axiosInstance from "../../../lib/axiosInstance";

export const getAllMatches = () => {
  return axiosInstance.get("/matches");
};

export const getMatchById = (id) => {
  return axiosInstance.get(`/matches/${id}`);
};

export const createMatch = (data) => {
  return axiosInstance.post("/admin/matches", data);
};

export const updateMatch = (id, data) => {
  return axiosInstance.patch(`/admin/matches/${id}`, data);
};

export const deleteMatch = (id) => {
  return axiosInstance.delete(`/admin/matches/${id}`);
};
