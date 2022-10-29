import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
