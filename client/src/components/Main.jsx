import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Icon from './ui/Icon';
import SearchInput from './ui/SearchInput';
import drinkWithFriends from '../assets/drink-with-friends.png';
import Recipe from './Recipe';
import Posts from './Posts';
import NotFound from '../pages/NotFound';

const Main = () => {
  return (
    <div className="flex-1 bg-gradient-to-r from-accent-dark-shade-700 to-accent-dark-shade-400 px-16 pt-8 flex flex-col">
      <div className="flex justify-between w-full">
        <SearchInput />
        <div className="flex gap-6">
          <Icon
            name="moon"
            style="text-secondary-main text-5xl cursor-pointer hover:text-secondary-tint-100"
          />
          <a className="text-white-100 heading-h6 font-bold rounded py-2 px-4 cursor-pointer bg-secondary-main hover:bg-secondary-tint-100">
            Logout
          </a>
        </div>
      </div>
      <div className="flex items-center gap-6 px-6 py-12">
        <img src={drinkWithFriends} alt="drink with friend" className="h-40" />
        <div className="flex flex-col gap-3">
          <p className="font-primary display-small font-bold text-white-100">
            No Idea What to Drink Today?
          </p>
          <div className="flex gap-9">
            <p className="font-primary heading-h3 font-bold text-white-100">
              Let us pick one for you
            </p>
            <a className="transition-all px-4 py-2 bg-primary-main heading-h6 font-bold text-white-400 rounded cursor-pointer hover:bg-primary-tint-100">
              Random
            </a>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="posts" element={<Posts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
