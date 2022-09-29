import { axiosInstance } from "../axios.config";
import { SignUpFormInputValues } from "../components/SignUp/signup-from.interface";

import request from "axios";
import { AuthErrorResponseInterface } from "../interfaces/auth-response.interface";

export async function signUpUser(signupFromData: SignUpFormInputValues) {
  if (signupFromData["confirm password"]) {
    delete signupFromData["confirm password"];
  }
  try {
    await axiosInstance.post("/auth/signup", signupFromData);
    alert("sign up created successfully");
    return true;
  } catch (error) {
    if (request.isAxiosError(error)) {
      alert((error.response?.data as AuthErrorResponseInterface).message);
    }
  }
}
