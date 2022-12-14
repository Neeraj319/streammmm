import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { User } from "./interfaces/user.interface";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { fetchUser } from "./services/fetch-user.service";

export const UserContext = React.createContext<User | null>(null);

export const AppRouter = () => {
  const [user, setUser] = useState<User | boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetchUser();
      setUser(response);
    })();
  }, []);
  return (
    <UserContext.Provider value={user as User}>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </UserContext.Provider>
  );
};
