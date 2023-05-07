import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cart, Main } from "../pages";

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};
