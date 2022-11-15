import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import { authActions } from '../store/auth-slice';
import InitialModalContext from '../store/initial-Modal-context';
import Admin from './auth/Admin';
import Posts from './posts/Posts';
import Recipes from './recipe/Recipes';
import Saved from './posts/Saved';
import IngredientSpirit from './spirit/IngredientSpirit';
import Spirits from './spirit/Spirits';
import Icon from './ui/Icon';
import SearchInput from './ui/SearchInput';

const Main = () => {
  const [mainNode, setMainNode] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logoutFn());
    navigate('/');
  };

  const mainElement = useRef();
  useEffect(() => {
    setMainNode(mainElement.current);
  }, []);

  return (
    <div
      className="relative flex-1 bg-gradient-to-r from-accent-dark-shade-700 to-accent-dark-shade-400 px-16 pt-8 flex flex-col"
      ref={mainElement}
    >
      <div className="flex justify-between w-full gap-24">
        <SearchInput />
        <div className="flex gap-6">
          <Icon
            name="moon"
            style="text-secondary-main text-5xl cursor-pointer hover:text-secondary-tint-100"
          />
          <a
            className="text-white-100 heading-h6 font-bold rounded py-2 px-4 cursor-pointer bg-secondary-main hover:bg-secondary-tint-100"
            onClick={logoutHandler}
          >
            Logout
          </a>
        </div>
      </div>
      <div className="overflow-hidden h-full flex flex-col w-[69rem] 2xl:w-[60rem]">
        <InitialModalContext.Provider value={mainNode}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to={'/dashboard/recipes'} />}
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
};

export default Main;
