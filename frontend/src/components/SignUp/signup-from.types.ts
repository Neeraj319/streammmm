import { Path, UseFormRegister } from "react-hook-form";
import { SignUpFormInputValues } from "./signup-from.interface";

export type InputProps = {
  label: Path<SignUpFormInputValues>;
  register: UseFormRegister<SignUpFormInputValues>;
  required: boolean;
};

export type UsernameInputProps = InputProps;
export type PasswordInputProps = InputProps;
export type ConfirmPasswordInputProps = InputProps;
export type FirstNameInputProps = InputProps;
export type LastNameInputProps = InputProps;
