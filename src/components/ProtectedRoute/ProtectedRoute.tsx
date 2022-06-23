import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { FC } from "react";
import Login from "../../pages/Login/Login";

export const ProtectedRoute = ( ) => {
  const { isAuth } = useSelector((store: any) => store.profile);

  return isAuth ? <Outlet/> : <Login/>

}



