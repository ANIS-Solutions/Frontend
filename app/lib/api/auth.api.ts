import axios from "axios";
import { env } from "@/app/config/env";
const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${env.apiUrl}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newToken = data.accessToken || data.data?.accessToken;

        if (!newToken) throw new Error("No token received");

        localStorage.setItem("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        // window.location.href = "/login";
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
