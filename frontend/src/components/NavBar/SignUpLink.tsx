import { useContext } from "react";
import { UserContext } from "../../routes";
import { Link } from "react-router-dom";
export const SignUpLink = () => {
  const user = useContext(UserContext);
  if (user) {
    return <> </>;
  } else
    return (
      <li>
        <Link
          to="/signup"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          Sign Up
        </Link>
      </li>
    );
};
