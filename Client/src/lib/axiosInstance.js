import axios from "axios";
import { env } from "../config/env";

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const errMessage = error.response?.data?.message;
    const errStatusCode = error.response?.status;

    const isUnauthorized =
      errStatusCode === 401 &&
      (errMessage === "NO Access token" ||
        errMessage === "Invalid or expired token");

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Request a new access token
        await axios.get(`${env.API_URL}/auth/refreshToken`, {
          withCredentials: true,
        });

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token call fails (expired or missing refresh token), redirect to login
        console.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
