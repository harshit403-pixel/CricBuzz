import axios from "axios";
import { toast } from "sonner";
import { env } from "../config/env";

let isRedirecting = false;

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

    const errMessage = error?.response?.data?.message;
    const errStatusCode = error?.response?.status;

    const isUnauthorized =
      errStatusCode === 401 &&
      (errMessage === "NO Access token" ||
        errMessage === "Invalid or expired token");

    if (isUnauthorized && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await axios.get(`${env.API_URL}/auth/refreshToken`, {
          withCredentials: true,
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // IMPORTANT:
        // Ignore bootstrap auth checks.
        if (originalRequest?.url?.includes("/auth/getMe")) {
          return Promise.reject(refreshError);
        }

        if (!isRedirecting) {
          isRedirecting = true;

          toast.error("Your session has expired. Please login again.");

          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }

        return Promise.reject(refreshError);
      }
    }

    if (errStatusCode === 429) {
      toast.error("Too many requests. Please wait a moment and try again.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
