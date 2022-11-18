import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/ui/Loading';
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
