import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Logo from '../ui/logo';
import BtnSidebar from './BtnSidebar';
import UserSidebar from './UserAvatarSidebar';

const dummyUser = {
  name: 'Cindy',
  avatar:
    'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
};

const allSidebarBtn = [
  { key: 1, tag: 'Recipes', icon: 'book-outline', activateIcon: 'book' },
  { key: 2, tag: 'Spirits', icon: 'wine-outline', activateIcon: 'wine' },
  { key: 3, tag: 'Saved', icon: 'bookmark-outline', activateIcon: 'bookmark' },
  { key: 4, tag: 'Posts', icon: 'create-outline', activateIcon: 'create' },
];

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [hovered, setHovered] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname.split('/')[2]);
    setHovered(false);
  }, [location.pathname]);

  const sideMenuHoverHandler = (e) => {
    if (!e.target.dataset.id || e.target.dataset.id === currentPage) return;

    const hoveredBtn = allSidebarBtn.find(
      (item) => item.tag === e.target.dataset.id
    );

    if (e.type === 'mouseover') {
      hoveredBtn.icon = hoveredBtn.icon.split('-')[0];
      setHovered(true);
      return;
    } else {
      hoveredBtn.icon = hoveredBtn.icon + '-outline';
      setHovered(false);
      return;
    }
  };

  return (
    <div className="w-[13rem] bg-accent-dark-main flex flex-col items-center pt-12 pb-6 justify-between">
      <div className="flex flex-col items-center gap-[5.5rem] w-full">
        <Logo />
        <UserSidebar name={dummyUser.name} avatar={dummyUser.avatar} />
        <div
          className="flex flex-col gap-6 w-full"
          onMouseOver={sideMenuHoverHandler}
          onMouseOut={sideMenuHoverHandler}
        >
          {allSidebarBtn.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
      <div className="paragraph-xsmall text-accent-dark-tint-300">
        <p>Copyright © 2022</p>
        <p>Designed By Chen Yu</p>
        <p>All right reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
