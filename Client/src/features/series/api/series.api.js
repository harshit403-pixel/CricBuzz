import axiosInstance from "../../../lib/axiosInstance";

export const getAllSeries = () => {
  return axiosInstance.get("/series");
};

export const getSeriesById = (id) => {
  return axiosInstance.get(`/series/${id}`);
};

export const createSeries = (data) => {
  return axiosInstance.post("/admin/series", data);
};

export const updateSeries = (id, data) => {
  return axiosInstance.patch(`/admin/series/${id}`, data);
};

export const deleteSeries = (id) => {
  return axiosInstance.delete(`/admin/series/${id}`);
};