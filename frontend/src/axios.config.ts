import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RESTAPI_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
