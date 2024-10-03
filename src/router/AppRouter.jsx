import React from "react";
import { Route, Routes } from "react-router";
import Main from "../main/Main";
import Test1 from "../pages/Test1";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/application" element={<Test1 />} />
    </Routes>
  );
};

export default AppRouter;
