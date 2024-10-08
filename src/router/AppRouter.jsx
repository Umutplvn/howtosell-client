import React from "react";
import { Route, Routes } from "react-router";
import Main from "../main/Main";
import Test1 from "../pages/Test1";
import DbMain from "../pages/DbMain";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import Verification from "../pages/Verification";
import Db from "../pages/Db";
import ResetForgottenPass from "../pages/ResetForgottenPass";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dbmain" element={<DbMain/>}/>
      <Route path="/dbmain/login" element={<Login/>}/>
      <Route path="/dbmain/register" element={<Register/>}/>
      <Route path="/dbmain/verification" element={<Verification/>}/>
      <Route path="/dbmain/forgotpass" element={<ForgotPass/>}/>
      <Route path="/reset-password/:userId" element={<ResetForgottenPass />} />
      <Route path="/db" element={<Db/>}/>
      <Route path="/" element={<Main />} />
      <Route path="/application" element={<Test1 />} />
    </Routes>
  );
};

export default AppRouter;
