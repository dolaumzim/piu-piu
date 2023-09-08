import { Navigate, Route, Routes, redirect} from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { MainLayout } from "../pages/MainLayout";
import { useGlobal } from "../context/global";
import { useEffect, useState } from "react";

export const PiupiuRoutes = () => {

  const {isLoggedIn} = useGlobal()
  console.log(isLoggedIn)

  return (
    <>
    <Routes>
      <Route index element={!isLoggedIn? <Login/> : <Navigate to={'/home'}/>}/>
      <Route path="/home" element={isLoggedIn ? <MainLayout/> : <Navigate to={'/'}/>}>
        <Route path="/home" element={<Home/>}/>
      </Route>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
    )
};
