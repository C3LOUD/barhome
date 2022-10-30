import React from 'react';
import Main from '../components/Main';
import Sidebar from '../components/sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="bg-accent-dark-shade-600 py-6 h-screen min-h-[48rem] w-screen flex justify-center 2xl:px-6">
      <div className="w-[90rem] h-full 2xl:w-full rounded-3xl overflow-hidden flex">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
