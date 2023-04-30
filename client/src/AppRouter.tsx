import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart, Login, Main, Registration } from "./pages";

export default function AppRouter() {
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
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Main />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/main" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </>
  );
}
