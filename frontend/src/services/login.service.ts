import { axiosInstance } from "../axios.config";
import { useNavigate } from "react-router-dom";

export const loginUser = async (username: string, password: string) => {
  try {
    await axiosInstance.post("/auth/login", {
      username: username,
      password: password,
    });
    alert("login success");
    // const navigate = useNavigate();
    // navigate("/");
  } catch (error) {
    alert("invalid username or password");
  }
};
