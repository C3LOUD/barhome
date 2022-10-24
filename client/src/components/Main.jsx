import React from 'react';
import Icon from './ui/Icon';
import SearchInput from './ui/SearchInput';

const Main = () => {
  return (
    <div className="flex-1 bg-gradient-to-r from-accent-dark-shade-700 to-accent-dark-shade-400 px-16 pt-8">
      <div className="flex justify-between w-full">
        <SearchInput />
        <div className="flex gap-6">
          <Icon
            name="moon"
            style="text-secondary-main text-5xl cursor-pointer"
          />
          <a className="text-white-100 text-xl leading-7 tracking-tight font-bold rounded py-2 px-4 cursor-pointer bg-secondary-main">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
