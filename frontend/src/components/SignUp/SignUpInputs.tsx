import {
  ConfirmPasswordInputProps,
  FirstNameInputProps,
  LastNameInputProps,
  PasswordInputProps,
  UsernameInputProps,
} from "./signup-from.types";

export const UsernameInput = ({
  label,
  register,
  required,
}: UsernameInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="username" className="text-sm font-semibold text-gray-500">
        {label}
      </label>
      <input
        type="text"
        id="username"
        defaultValue=""
        {...register(label, { required })}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};

export const LastNameInput = ({
  label,
  register,
  required,
}: LastNameInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="lastname" className="text-sm font-semibold text-gray-500">
        {label}
      </label>
      <input
        type="text"
        id="lastname"
        defaultValue=""
        {...register(label, { required })}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};

export const FirstNameInput = ({
  label,
  register,
  required,
}: FirstNameInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor="firstname"
        className="text-sm font-semibold text-gray-500"
      >
        {label}
      </label>
      <input
        type="text"
        id="firstname"
        defaultValue=""
        {...register(label, { required })}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};
export const PasswordInput = ({
  label,
  register,
  required,
}: PasswordInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-500"
        >
          {label}
        </label>
      </div>
      <input
        type="password"
        id="password"
        {...register(label, { required })}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};

export const ConfirmPasswordInput = ({
  label,
  register,
  required,
}: ConfirmPasswordInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-gray-500"
        >
          {label}
        </label>
      </div>
      <input
        type="password"
        id="confirmPassword"
        {...register(label, { required })}
        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
    </div>
  );
};
