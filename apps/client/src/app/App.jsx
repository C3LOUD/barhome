import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/ui/Loading';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const HomePage = React.lazy(() => import('./pages/HomePage'));

export default function App() {
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
}
