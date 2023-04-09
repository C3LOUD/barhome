import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.png';
import { adminActions } from '../../store/admin-slice';
import { authActions, login } from '../../store/auth-slice';
import { getUser } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';

const NavBar = (props) => {
  const [hamburger, setHamburger] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { name, avatar } = useSelector((state) => state.admin);

  const location = useLocation();

  const dispatch = useDispatch();
  const { data, refetch } = getUser();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logoutFn());
  };

  const hamburgerHandler = () => {
    setHamburger((prev) => !prev);
  };

  const smoothScrollHandler = (e) => {
    e.preventDefault();
    const el = document.getElementById(e.target.dataset.id);
    if (!el) return;
    setHamburger(false);
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

  useEffect(() => {
    setHamburger(false);
  }, [location]);

  return (
    <div
      className={`flex h-16 shrink-0 items-center justify-between px-12 text-white-100 2xs:px-2 ${
        props.style
          ? 'fixed top-0 z-50 w-full bg-primary-main'
          : 'bg-accent-dark-main'
      }`}
    >
      <Logo />
      <div className="hidden items-center gap-4 sm:flex">
        {isLoggedIn ? (
          <NavLink
            className="navLink bg-secondary-main hover:bg-secondary-tint-200"
            to="/Dashboard"
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink
            className="navLink bg-secondary-main hover:bg-secondary-tint-200"
            to="/login"
          >
            Login
          </NavLink>
        )}
        <div
          className={`z-30 hidden origin-bottom-right rounded-t-full px-2 py-2 transition-all sm:block ${
            hamburger && 'bg-accent-dark-shade-500'
          }`}
        >
          <Icon
            name="menu-sharp"
            style="text-5xl hover:text-white-400 transition-all cursor-pointer"
            onClick={hamburgerHandler}
          />
        </div>
      </div>

      <div
        className={`flex origin-top-right items-center gap-4 transition-all md:gap-2 sm:absolute sm:top-10 sm:right-12 sm:z-30 sm:flex-col sm:bg-accent-dark-shade-500 sm:py-4 sm:px-4 2xs:right-2 ${
          hamburger ? 'sm:scale-100' : 'sm:scale-0'
        }`}
        onClick={smoothScrollHandler}
      >
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
        {!isLoggedIn ? (
          <NavLink
            className="navLink sm:w-full sm:bg-secondary-main sm:hover:bg-secondary-tint-200"
            to="/signup"
          >
            Sign up
          </NavLink>
        ) : (
          <div className="group flex h-full cursor-pointer items-center gap-4 sm:-order-1">
            <img
              src={avatar || tempAvatar}
              alt="user avatar"
              className="h-12 rounded-full"
            />
            <div className="relative">
              {`Welcome ${name || 'User'}`}
              <div className="absolute top-0 left-0 z-50 hidden w-full pt-14 text-center transition-all group-hover:block sm:group-hover:hidden">
                <a
                  className="before:tooltip-triangle relative w-full rounded bg-secondary-main px-4 py-2"
                  onClick={logoutHandler}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <>
            <NavLink
              className="navLink hidden w-full bg-secondary-main hover:bg-secondary-tint-200 sm:block"
              onClick={logoutHandler}
            >
              Logout
            </NavLink>
            <NavLink
              className="navLink bg-secondary-main hover:bg-secondary-tint-200 sm:hidden"
              to="/Dashboard"
            >
              Dashboard
            </NavLink>
          </>
        ) : (
          <NavLink
            className="navLink bg-secondary-main hover:bg-secondary-tint-200 sm:hidden"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
