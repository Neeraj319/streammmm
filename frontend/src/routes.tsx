import { Route, Routes } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};
