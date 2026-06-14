import axiosInstance from "../../../lib/axiosInstance";

export const getAllTeams = () => {
  return axiosInstance.get("/teams");
};

export const getTeamById = (id) => {
  return axiosInstance.get(`/teams/${id}`);
};

export const createTeam = (data) => {
  return axiosInstance.post("/admin/teams", data);
};

export const updateTeam = (id, data) => {
  return axiosInstance.patch(`/admin/teams/${id}`, data);
};

export const deleteTeam = (id) => {
  return axiosInstance.delete(`/admin/teams/${id}`);
};