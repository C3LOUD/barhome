import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ForgetPassword from '../components/auth/ForgetPassword';
import Login from '../components/auth/Login';
import ResetPassword from '../components/auth/ResetPassword';
import SignUp from '../components/auth/SignUp';
import Home from '../components/landing/Home';
import NavBar from '../components/landing/NavBar';

export default function HomePage() {
  const [navStyle, setNavStyle] = useState(true);
  const navStyleHandler = (style) => setNavStyle(style);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar navStyle={navStyle} />
      <div className="relative flex flex-1 flex-col items-center justify-center bg-accent-dark-main">
        <Routes>
          <Route path="/" element={<Home onNav={navStyleHandler} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
}
