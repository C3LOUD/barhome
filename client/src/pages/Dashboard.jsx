import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Main from '../components/Main';
import Sidebar from '../components/sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="bg-accent-dark-shade-600 py-6 h-screen min-h-[48rem] w-screen flex justify-center 2xl:px-6">
      <div className="max-w-[90rem] h-full rounded-3xl overflow-hidden flex">
        <ErrorBoundary>
          <Sidebar />
          <Main />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Dashboard;
