import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import tempAvatar from '../../../assets/7007892.png';

export default function UserAvatarSidebar() {
  const { name, avatar } = useSelector((state) => state.admin);

  return (
    <Link
      className="group mx-auto flex flex-col items-center justify-center gap-1"
      to="/dashboard/admin"
    >
      <div className="aspect-square w-20 overflow-hidden rounded-full shadow-2xl">
        <img
          className="transition-all group-hover:scale-110"
          src={avatar || tempAvatar}
          alt="user avatar"
        />
      </div>
      <p className="paragraph-large font-semibold text-white-100 transition-all group-hover:text-white-400">
        {name || 'User'}
      </p>
    </Link>
  );
}
