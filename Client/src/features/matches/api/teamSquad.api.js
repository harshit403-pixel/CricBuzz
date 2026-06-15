import axiosInstance from "../../../lib/axiosInstance";

export const getTeamSquad = (teamId) => {
  return axiosInstance.get(`/admin/teams/${teamId}/squad`);
};
