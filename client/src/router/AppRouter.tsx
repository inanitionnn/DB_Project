import React from "react";
import { useAppSelector } from "../redux/hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginRoutes } from "./LoginRoutes";
import { LoggedRoutes } from "./LoggedRoutes";

export const AppRouter = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <div className="bg-orange-200 min-h-screen flex justify-center">
        {isLoggedIn ? <LoginRoutes /> : <LoggedRoutes />}
      </div>
    </>
  );
};
