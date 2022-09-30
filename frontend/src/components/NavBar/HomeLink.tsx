import { Link } from "react-router-dom";

export const HomeLink = () => {
  return (
    <li>
      <Link
        to="/"
        className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        aria-current="page"
      >
        Home
      </Link>
    </li>
  );
};
