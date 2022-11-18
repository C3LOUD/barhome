import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import Main from '../components/Main';
import Sidebar from '../components/sidebar/Sidebar';

const Dashboard = () => {
  const [hamburger, setHamburger] = useState(false);
  const location = useLocation();

  const hamburgerHandler = () => {
    setHamburger((prev) => !prev);
  };

  useEffect(() => {
    setHamburger(false);
  }, [location]);

  return (
    <div className="flex h-screen w-screen justify-center bg-accent-dark-shade-600 py-6 2xl:px-6 lg:px-4 lg:py-4">
      <div className="relative flex h-full max-w-[90rem] overflow-hidden rounded-3xl 2xl:w-full">
        <ErrorBoundary>
          <Sidebar hamburger={hamburger} />
          <div
            className={`absolute z-20 hidden h-full w-full bg-accent-dark-shade-800/80 ${
              hamburger && 'md:block'
            }`}
            onClick={hamburgerHandler}
          ></div>
          <Main onHamburger={hamburgerHandler} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Dashboard;
