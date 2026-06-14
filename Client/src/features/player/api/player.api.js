import axiosInstance from "../../../lib/axiosInstance";

export const getAllPlayers = () => {
  return axiosInstance.get("/players");
};

export const getPlayerById = (id) => {
  return axiosInstance.get(`/players/${id}`);
};

export const createPlayer = (data) => {
  return axiosInstance.post("/admin/players", data);
};

export const updatePlayer = (id, data) => {
  return axiosInstance.patch(
    `/admin/players/${id}`,
    data,
  );
};

export const deletePlayer = (id) => {
  return axiosInstance.delete(
    `/admin/players/${id}`,
  );
};