import { axiosInstance } from "../axios.config";
import { User } from "../interfaces/user.interface";
import request from "axios";
import { ErrorAuthResponseInterface } from "../interfaces/error-response.interface";

const loginUserRefreshToken = async () => {
  try {
    await axiosInstance.post("/auth/refresh");
    return true;
  } catch (error) {
    if (request.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorAuthResponseInterface;
      if (
        errorResponse?.statusCode === 400 ||
        errorResponse?.statusCode === 401
      ) {
        return false;
      }
    }
    return false;
  }
};

export const fetchUser = async (): Promise<User | boolean> => {
  try {
    const response = await axiosInstance.get("/user");
    console.log(response);
    const user: User = response.data;
    return user;
  } catch (error) {
    if (request.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorAuthResponseInterface;
      if (errorResponse?.statusCode === 401) {
        return await loginUserRefreshToken();
      }
    }
    return false;
  }
};
