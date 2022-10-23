import React from 'react';
import Logo from './ui/logo';
import UserSidebar from './ui/UserSidebar';

const Sidebar = () => {
  return (
    <div className="w-[13rem] bg-accent-dark-main flex flex-col items-center pt-12">
      <Logo />
      <UserSidebar />
    </div>
  );
};

export default Sidebar;
