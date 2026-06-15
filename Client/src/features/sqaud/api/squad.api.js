import axiosInstance from "../../../lib/axiosInstance";

export const getSquad = (teamId) => {
  return axiosInstance.get(`/admin/teams/${teamId}/squad`);
};

export const addPlayerToSquad = (teamId, playerId) => {
  return axiosInstance.post(`/admin/teams/${teamId}/squad`, {
    playerId,
  });
};

export const removePlayerFromSquad = (teamId, playerId) => {
  return axiosInstance.delete(`/admin/teams/${teamId}/squad/${playerId}`);
};
