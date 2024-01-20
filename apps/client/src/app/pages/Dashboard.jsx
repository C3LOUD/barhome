import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Main from '../components/Main';
import Sidebar from '../components/sidebar/Sidebar';

export default function Dashboard() {
  const [hamburger, setHamburger] = useState(false);
  const location = useLocation();

  const hamburgerHandler = () => {
    setHamburger((prev) => !prev);
  };

  useEffect(() => {
    setHamburger(false);
  }, [location]);

  return (
    <div className="bg-accent-dark-shade-600 h-[100dvh] w-[100dvw] py-6 lg:px-4 lg:py-4 2xl:px-6">
      <div className="relative mx-auto flex h-full max-w-[90rem] overflow-hidden rounded-3xl 2xl:w-full">
        <Sidebar hamburger={hamburger} />
        <div
          className={twMerge(
            'bg-accent-dark-shade-800/80 absolute z-20 hidden h-full w-full',
            hamburger && 'md:block',
          )}
          onClick={hamburgerHandler}
        />
        <Main onHamburger={hamburgerHandler} />
      </div>
    </div>
  );
}
