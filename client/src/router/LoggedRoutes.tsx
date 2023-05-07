import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Registration } from "../pages";

export const LoggedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
