import { Path, UseFormRegister } from "react-hook-form";
import { LoginFormInputValues } from "./login-from.interface";

export type InputProps = {
  label: Path<LoginFormInputValues>;
  register: UseFormRegister<LoginFormInputValues>;
  required: boolean;
};
export type UsernameInputProps = InputProps;

export type PasswordInputProps = InputProps;
