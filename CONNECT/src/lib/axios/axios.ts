import axios from "axios";
import { getJWT } from "../utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getJWT()}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "Requeest Failed";
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
