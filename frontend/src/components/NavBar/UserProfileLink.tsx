import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../routes";

export const UserProfileLink = () => {
  const user = useContext(UserContext);
  if (user) {
    return (
      <li>
        <Link
          to={"/profile/" + user.id}
          className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
          aria-current="page"
        >
          {user.username}
        </Link>
      </li>
    );
  } else return <> </>;
};
