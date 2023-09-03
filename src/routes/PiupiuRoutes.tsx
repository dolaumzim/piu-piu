import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";

export const PiupiuRoutes = () => {
  return (
    <>
    <Routes>
      <Route index element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
    )
};
