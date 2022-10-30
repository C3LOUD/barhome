import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Icon from './ui/Icon';
import SearchInput from './ui/SearchInput';
import Recipes from './Recipes';
import Posts from './Posts';
import NotFound from '../pages/NotFound';
import Spirits from './Spirits';
import Saved from './Saved';
import InitialContext from '../store/initial-context';
import { useState } from 'react';

const Main = () => {
  const [mainNode, setMainNode] = useState(null);

  const mainElement = useRef();
  useEffect(() => {
    setMainNode(mainElement.current);
  }, []);

  return (
    <div
      className="relative flex-1 bg-gradient-to-r from-accent-dark-shade-700 to-accent-dark-shade-400 px-16 pt-8 flex flex-col"
      ref={mainElement}
    >
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
      <InitialContext.Provider value={mainNode}>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={'/dashboard/recipes'} />}
          />
          <Route path="recipes/*" element={<Recipes />} />
          <Route path="spirits" element={<Spirits />} />
          <Route path="saved" element={<Saved />} />
          <Route path="posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </InitialContext.Provider>
    </div>
  );
};

export default Main;
