import { axiosInstance } from "../axios.config";
import { AuthErrorResponseInterface } from "../interfaces/auth-response.interface";
import request from "axios";
export const loginUser = async (username: string, password: string) => {
  try {
    await axiosInstance.post("/auth/login", {
      username: username,
      password: password,
    });
    alert("login success");
    return true;
  } catch (error) {
    if (request.isAxiosError(error)) {
      alert((error.response?.data as AuthErrorResponseInterface).message);
    }
  }
};
