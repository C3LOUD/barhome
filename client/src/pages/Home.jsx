import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex justify-center items-center flex-1 bg-accent-dark-main relative">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
