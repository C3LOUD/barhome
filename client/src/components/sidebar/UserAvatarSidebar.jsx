import React from 'react';
import { useSelector } from 'react-redux';

import tempAvatar from '../../assets/7007892.jpg';

const UserAvatarSidebar = () => {
  const { name, avatar } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col justify-center items-center gap-1 mx-auto">
      <img
        className="rounded-[9999px] w-20 aspect-square"
        src={avatar || tempAvatar}
        alt="user avatar"
      />
      <p className="font-semibold paragraph-large text-white-100">
        {name || 'User'}
      </p>
    </div>
  );
};

export default UserAvatarSidebar;
