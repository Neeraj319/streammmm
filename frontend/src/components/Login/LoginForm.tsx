import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "../../services/login.service";
import { LoginFormInputValues } from "./login-from.interface";
import { PasswordInput, UsernameInput } from "./LoginInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
const schema = yup.object({
  username: yup.string().max(20).min(3).required("Username is required"),
  password: yup.string().max(46).min(8).required("Password is required"),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFormInputValues> = async (
    data: LoginFormInputValues
  ) => {
    if (await loginUser(data.username, data.password)) {
      navigate("/");
    }
  };

  return (
    <div className="p-5 bg-black-100 md:flex-1">
      <h3 className="my-4 text-2xl font-semibold text-gray-700">
        Account Login
      </h3>
      <form
        action="#"
        className="flex flex-col space-y-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <UsernameInput label="username" register={register} required />
        {errors.username && <p> {errors.username.message} </p>}
        {errors.password && <p> {errors.password.message} </p>}
        <PasswordInput label="password" register={register} required />
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
