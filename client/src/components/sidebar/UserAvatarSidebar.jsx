import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.jpg';

const UserAvatarSidebar = () => {
  const { name, avatar } = useSelector((state) => state.admin);

  return (
    <Link
      className="flex flex-col justify-center items-center gap-1 mx-auto group"
      to="/dashboard/admin"
    >
      <div className="rounded-full w-20 aspect-square overflow-hidden shadow-2xl">
        <img
          className="group-hover:scale-110 transition-all"
          src={avatar || tempAvatar}
          alt="user avatar"
        />
      </div>
      <p className="font-semibold paragraph-large text-white-100 group-hover:text-white-400 transition-all">
        {name || 'User'}
      </p>
    </Link>
  );
};

export default UserAvatarSidebar;
