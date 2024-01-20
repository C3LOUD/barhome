import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import DarkModeSwitcher from '../ui/DarkModeSwitcher';
import Logo from '../ui/Logo';
import LogoutBtn from '../ui/LogoutBtn';
import BtnSidebar from './BtnSidebar';
import UserSidebar from './UserAvatarSidebar';

const allSidebarBtn = [
  { key: 1, tag: 'Recipes', icon: 'book-outline', activateIcon: 'book' },
  { key: 2, tag: 'Spirits', icon: 'wine-outline', activateIcon: 'wine' },
  { key: 3, tag: 'Saved', icon: 'bookmark-outline', activateIcon: 'bookmark' },
  { key: 4, tag: 'Posts', icon: 'create-outline', activateIcon: 'create' },
];

export default function Sidebar({ hamburger }) {
  const [currentPage, setCurrentPage] = useState('');

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname.split('/')[2]);
  }, [location.pathname]);

  const sideMenuHoverHandler = (e) => {
    if (!e.target.dataset.id || e.target.dataset.id === currentPage) return;

    const hoveredBtn = allSidebarBtn.find(
      (item) => item.tag === e.target.dataset.id,
    );

    if (e.type === 'mouseover') {
      hoveredBtn.icon = hoveredBtn.icon.split('-')[0];
    } else {
      hoveredBtn.icon = hoveredBtn.icon + '-outline';
    }
  };

  return (
    <div
      className={twMerge(
        'bg-accent-dark-main scrollbar-none flex w-[13rem] flex-col items-center justify-between overflow-y-auto pb-6 pt-12 transition-all md:absolute md:top-0 md:z-30 md:h-full',
        hamburger ? 'md:left-0' : 'md:-left-full',
      )}
    >
      <div className="2xs:gap-12 flex w-full flex-col items-center gap-[5.5rem]">
        <Logo />
        <UserSidebar />
        <div
          className="2xs:gap-4 flex w-full flex-col gap-6"
          onMouseOver={sideMenuHoverHandler}
          onMouseOut={sideMenuHoverHandler}
        >
          {allSidebarBtn.map((item) => (
            <BtnSidebar
              tag={item.tag}
              icon={
                currentPage === item.tag.toLowerCase()
                  ? item.activateIcon
                  : item.icon
              }
              style={
                currentPage === item.tag.toLowerCase() && 'bg-primary-main'
              }
              key={item.key}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-6 pt-6">
        <div className="xs:flex hidden flex-col gap-4">
          <DarkModeSwitcher />
          <LogoutBtn />
        </div>
        <div className="paragraph-xsmall text-accent-dark-tint-300">
          <p>Copyright © 2022</p>
          <p>Designed By Chen Yu</p>
          <p>All right reserved</p>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  hamburger: PropTypes.bool.isRequired,
};
