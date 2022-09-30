import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../routes";

export const LogoutLink = () => {
  const user = useContext(UserContext);
  if (user) {
    return (
      <li>
        <Link
          to="/logout"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          Logout
        </Link>
      </li>
    );
  } else return <> </>;
};
