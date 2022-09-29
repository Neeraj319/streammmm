import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInputValues } from "./signup-from.interface";
import { signUpUser } from "../../services/signup.service";
import {
  ConfirmPasswordInput,
  FirstNameInput,
  LastNameInput,
  PasswordInput,
  UsernameInput,
} from "./SignUpInputs";
import { signUpFormSchema } from "./from-validation";
import { useNavigate } from "react-router";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputValues>({
    resolver: yupResolver(signUpFormSchema),
  });
  const onSubmit: SubmitHandler<SignUpFormInputValues> = async (
    data: SignUpFormInputValues
  ) => {
    if (await signUpUser(data)) {
      navigate("/login");
    }
  };
  return (
    <div className="p-5 bg-black-100 md:flex-1">
      <h3 className="my-4 text-2xl font-semibold text-gray-700">
        Account SignUp
      </h3>
      <form
        action="#"
        className="flex flex-col space-y-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <UsernameInput label="username" register={register} required />
        <FirstNameInput
          label="first name"
          register={register}
          required={false}
        />
        <LastNameInput label="last name" register={register} required={false} />
        <PasswordInput label="password" register={register} required />
        <ConfirmPasswordInput
          label="confirm password"
          register={register}
          required
        />
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Sign Up
          </button>
        </div>
        {errors.username && <p> {errors.username.message} </p>}
        {errors.password && <p> {errors.password.message} </p>}
        {errors["confirm password"] && (
          <p> {errors["confirm password"].message} </p>
        )}
        {errors["first name"] && <p> {errors["first name"].message} </p>}
        {errors["last name"] && <p> {errors["last name"].message} </p>}
      </form>
    </div>
  );
};
