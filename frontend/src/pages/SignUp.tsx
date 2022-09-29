import { SignUpBox } from "../components/SignUp/SignUpBox";
import { SignUpForm } from "../components/SignUp/SignUpForm";

export const SignUp = () => {
  return (
    <div className="flex items-center m-44 p-4 bg-black-100 lg:justify-center">
      <div className="flex items-center bg-black-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <SignUpBox />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
