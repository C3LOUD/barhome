import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import tempAvatar from '../../../assets/7007892.png';
import { adminActions } from '../../store/admin-slice';
import { authActions, login } from '../../store/auth-slice';
import { useGetUser } from '../../utils/api-list';
import Logo from '../ui/Logo';

export default function NavBar({ navStyle }) {
  const [hamburger, setHamburger] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { name, avatar } = useSelector((state) => state.admin);

  const location = useLocation();

  const dispatch = useDispatch();
  const { data, refetch } = useGetUser();

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
    if (!data) return;
    dispatch(
      adminActions.setUser({
        id: data.id,
        name: data.name,
        imgUrl: data.imgUrl,
        saved: data.saved,
        liked: data.liked,
        posts: data.posts,
      }),
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
      className={twMerge(
        'text-white-100 2xs:px-2 flex h-16 shrink-0 items-center justify-between px-12',
        navStyle
          ? 'bg-primary-main fixed top-0 z-50 w-full'
          : 'bg-accent-dark-main',
      )}
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
          className={twMerge(
            'z-30 hidden origin-bottom-right rounded-t-full px-2 py-2 transition-all sm:block',
            hamburger && 'bg-accent-dark-shade-500',
          )}
        >
          <button
            type="button"
            onClick={hamburgerHandler}
            className="hover:text-white-400 flex cursor-pointer text-5xl transition-all"
          >
            <ion-icon name="menu-sharp" />
          </button>
        </div>
      </div>

      <div
        className={twMerge(
          'sm:bg-accent-dark-shade-500 2xs:right-2 flex origin-top-right items-center gap-4 transition-all sm:absolute sm:right-12 sm:top-10 sm:z-30 sm:flex-col sm:px-4 sm:py-4 md:gap-2',
          hamburger ? 'sm:scale-100' : 'sm:scale-0',
        )}
      >
        <button
          type="button"
          className="navLink"
          data-id="features"
          onClick={smoothScrollHandler}
        >
          Features
        </button>
        <button
          type="button"
          className="navLink"
          data-id="testimonials"
          onClick={smoothScrollHandler}
        >
          Testimonials
        </button>
        <button
          type="button"
          className="navLink"
          data-id="pricing"
          onClick={smoothScrollHandler}
        >
          Pricing
        </button>
        {!isLoggedIn ? (
          <NavLink
            className="navLink sm:bg-secondary-main sm:hover:bg-secondary-tint-200 sm:w-full"
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
              <div className="absolute left-0 top-0 z-50 hidden w-full pt-14 text-center transition-all group-hover:block sm:group-hover:hidden">
                <button
                  type="button"
                  className="before:tooltip-triangle bg-secondary-main relative w-full rounded px-4 py-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <>
            <NavLink
              className="navLink bg-secondary-main hover:bg-secondary-tint-200 hidden w-full sm:block"
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
}

NavBar.propTypes = {
  navStyle: PropTypes.bool,
};

NavBar.defaultProps = {
  navStyle: false,
};
