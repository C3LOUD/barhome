import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import tempAvatar from '../assets/7007892.jpg';
import Logo from './ui/Logo';
import { authActions, login } from '../store/auth-slice';
import { getUser } from '../utils/api-list';

const NavBar = () => {
  const { isLoggedIn, name, avatar } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { data, refetch } = getUser();

  useEffect(() => {
    refetch();
    data &&
      dispatch(
        authActions.setUser({
          name: data.name,
          imgUrl: data.imgUrl,
          saved: data.saved,
        })
      );
  }, [data, isLoggedIn]);

  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <div className="h-16 flex bg-primary-main justify-between items-center px-12 text-white-100">
      <Logo />
      <div className="flex gap-4 items-center">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary-main navLink' : 'navLink'
          }
          to="/pricing"
        >
          Pricing
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-secondary-main navLink' : 'navLink'
              }
              to="/signup"
            >
              Sign up
            </NavLink>
            <NavLink
              className="navLink bg-secondary-main hover:bg-secondary-tint-200"
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <div className="flex h-full items-center gap-2">
              <img
                src={avatar || tempAvatar}
                alt="user avatar"
                className="h-12 rounded-full"
              />
              <p>{`Welcome ${name || 'User'}`}</p>
            </div>
            <NavLink
              className="navLink bg-secondary-main hover:bg-secondary-tint-200"
              to="/Dashboard"
            >
              Dashboard
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
