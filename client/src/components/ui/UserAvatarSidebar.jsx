import React from 'react';

const UserAvatarSidebar = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <img
        className="rounded-[9999px] w-20 aspect-square"
        src={props.avatar}
        alt="user avatar"
      />
      <p className="font-semibold text-lg text-white-100">{props.name}</p>
    </div>
  );
};

export default UserAvatarSidebar;
