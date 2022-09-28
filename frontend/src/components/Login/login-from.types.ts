import { Path, UseFormRegister } from "react-hook-form";
import { FormInputValues } from "./login-from.interface";

export type UsernameInputProps = {
  label: Path<FormInputValues>;
  register: UseFormRegister<FormInputValues>;
  required: boolean;
};

export type PasswordInputProps = {
  label: Path<FormInputValues>;
  register: UseFormRegister<FormInputValues>;
  required: boolean;
};
