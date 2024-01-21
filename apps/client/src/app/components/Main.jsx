import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import InitialModalContext from '../store/initial-Modal-context';
import Admin from './auth/Admin';
import Posts from './posts/Posts';
import Saved from './posts/Saved';
import Recipes from './recipe/Recipes';
import IngredientSpirit from './spirit/IngredientSpirit';
import Spirits from './spirit/Spirits';
import DarkModeSwitcher from './ui/DarkModeSwitcher';
import LogoutBtn from './ui/LogoutBtn';
import SearchInput from './ui/SearchInput';

export default function Main({ onHamburger }) {
  const [mainNode, setMainNode] = useState(null);

  const mainElement = useRef();
  useEffect(() => {
    setMainNode(mainElement.current);
  }, []);

  return (
    <div
      className="from-accent-dark-shade-700 to-accent-dark-shade-400 dark:from-accent-dark-tint-500 dark:to-accent-dark-tint-700 relative flex flex-1 flex-col overflow-hidden bg-gradient-to-r px-16 pt-8 sm:px-8 lg:px-12"
      ref={mainElement}
    >
      <div className="2xs:mb-4 flex w-full justify-between gap-24 md:gap-12">
        <div className="flex w-full gap-4">
          <button
            type="button"
            onClick={onHamburger}
            className="text-white-100 hover:text-white-400 dark:text-black-100 hidden text-5xl transition-all md:flex dark:hover:text-gray-400"
          >
            <ion-icon name="menu-sharp" />
          </button>
          <SearchInput />
        </div>
        <div className="xs:hidden flex gap-6">
          <DarkModeSwitcher />
          <LogoutBtn />
        </div>
      </div>
      <div className="scrollbar-none 2xs:block flex w-[69rem] flex-1 flex-col overflow-y-auto 2xl:w-full">
        <InitialModalContext.Provider value={mainNode}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/dashboard/recipes" />}
            />
            <Route path="admin/*" element={<Admin />} />
            <Route path="recipes/*" element={<Recipes />} />
            <Route path="spirits/*" element={<Spirits />} />
            <Route
              path="ingredient/*"
              element={<Navigate replace to="/dashboard/spirits" />}
            />
            <Route
              path={'ingredient/:ingredient/*'}
              element={<IngredientSpirit />}
            />
            <Route path="saved/*" element={<Saved />} />
            <Route path="posts/*" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </InitialModalContext.Provider>
      </div>
    </div>
  );
}

Main.propTypes = {
  onHamburger: PropTypes.func.isRequired,
};
