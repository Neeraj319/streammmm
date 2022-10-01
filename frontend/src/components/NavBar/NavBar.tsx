import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { UserProfileLink } from "./UserProfileLink";
import { SignUpLink } from "./SignUpLink";
import { LoginUpLink } from "./LoginLink";
import { SearchMobileView } from "./SearchMobileView";
import { SearchPcView } from "./SearchPcView";
import { SearchPcButton } from "./SearchPcButton";
import { SearchMobileButton } from "./SearchMobileButton";
import React from "react";
import { HomeLink } from "./HomeLink";

const StreammmmLink = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        Streammm
      </span>
    </Link>
  );
};
export const NavBar = (): React.ReactElement => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <StreammmmLink />
        <div className="flex md:order-2">
          <SearchPcButton />
          <SearchPcView />
          <SearchMobileButton />
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <SearchMobileView />
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <HomeLink />
            <UserProfileLink />
            <LogoutLink />
            <SignUpLink />
            <LoginUpLink />
          </ul>
        </div>
      </div>
    </nav>
  );
};
