import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
