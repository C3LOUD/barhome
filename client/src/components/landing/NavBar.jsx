import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.jpg';
import { adminActions } from '../../store/admin-slice';
import { authActions, login } from '../../store/auth-slice';
import { getUser } from '../../utils/api-list';
import Logo from '../ui/Logo';

const NavBar = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { name, avatar } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const { data, refetch } = getUser();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logoutFn());
  };

  const smoothScrollHandler = (e) => {
    e.preventDefault();
    const el = document.getElementById(e.target.dataset.id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    refetch();
    data &&
      dispatch(
        adminActions.setUser({
          id: data.id,
          name: data.name,
          imgUrl: data.imgUrl,
          saved: data.saved,
          liked: data.liked,
          posts: data.posts,
        })
      );
  }, [data, isLoggedIn]);

  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <div
      className={`h-16 flex justify-between items-center px-12 text-white-100 shrink-0 ${
        props.style
          ? 'bg-primary-main fixed top-0 w-full z-50'
          : 'bg-accent-dark-main'
      }`}
    >
      <Logo />
      <div className="flex gap-4 items-center" onClick={smoothScrollHandler}>
        <a className="navLink" data-id="features" onClick={smoothScrollHandler}>
          Features
        </a>
        <a
          className="navLink"
          data-id="testimonials"
          onClick={smoothScrollHandler}
        >
          Testimonials
        </a>
        <a className="navLink" data-id="pricing" onClick={smoothScrollHandler}>
          Pricing
        </a>
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
            <div className="flex h-full items-center gap-4 group cursor-pointer">
              <img
                src={avatar || tempAvatar}
                alt="user avatar"
                className="h-12 rounded-full"
              />
              <div className="relative">
                {`Welcome ${name || 'User'}`}
                <div className="pt-14 transition-all absolute top-0 left-0 z-50 w-full group-hover:block hidden text-center">
                  <a
                    className=" bg-secondary-main px-4 py-2 rounded w-full relative before:tooltip-triangle"
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </div>
              </div>
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