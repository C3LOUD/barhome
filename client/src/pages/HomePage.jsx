import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ForgetPassword from '../components/auth/ForgetPassword';
import Login from '../components/auth/Login';
import ResetPassword from '../components/auth/ResetPassword';
import SignUp from '../components/auth/SignUp';
import Home from '../components/landing/Home';
import NavBar from '../components/landing/NavBar';

const HomePage = () => {
  const [navStyle, setNavStyle] = useState(null);
  const navStyleHandler = (style) => setNavStyle(style);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar style={navStyle} />
      <div className="flex flex-col justify-center items-center flex-1 bg-accent-dark-main relative">
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
};

export default HomePage;
