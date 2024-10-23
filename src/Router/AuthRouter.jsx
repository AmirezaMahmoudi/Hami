/** @format */

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Auth";
// import AuthLayout from './AuthLayout';

// import MainLayout from "../Layout";
// import { Login } from "../Pages";

// import {Dashboard} from "./Pages"
const AuthRouter = () => {
  return (
    <Routes>
      {/* auth */}
      <Route path='*' element={<Navigate to={"/auth/login"} />} />
      <Route path='/auth/login' element={<Login/>} />
    </Routes>
  );
};

export default AuthRouter;
