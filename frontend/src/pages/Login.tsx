import { LoginBox } from "../components/Login/LoginBox";
import { LoginForm } from "../components/Login/LoginForm";
export const Login = () => {
  return (
    <div className="flex items-center m-44 p-4 bg-black-100 lg:justify-center">
      <div className="flex items-center bg-black-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <LoginBox />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
