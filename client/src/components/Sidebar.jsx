import React, { useState } from 'react';
import BtnSidebar from './ui/BtnSidebar';

import Logo from './ui/logo';
import UserSidebar from './ui/UserAvatarSidebar';

const dummyUser = {
  name: 'Cindy',
  avatar:
    'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
};

const allSidebarBtn = [
  { key: 1, tag: 'Recipes', icon: 'book-outline', style: '' },
  { key: 2, tag: 'Spirits', icon: 'wine-outline', style: '' },
  { key: 3, tag: 'Saved', icon: 'bookmark-outline', style: '' },
  { key: 4, tag: 'Posts', icon: 'create-outline', style: '' },
];

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [hovered, setHovered] = useState(false);

  const sideMenuHandler = (e) => {
    e.preventDefault();
    if (!e.target.dataset.id) return;
    const previousBtn = allSidebarBtn.find((item) => item.tag === currentPage);
    if (previousBtn) {
      previousBtn.icon = previousBtn.icon + '-outline';
    }

    setCurrentPage(e.target.dataset.id);
    setHovered(false);
  };

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
          onClick={sideMenuHandler}
          onMouseOver={sideMenuHoverHandler}
          onMouseOut={sideMenuHoverHandler}
        >
          {allSidebarBtn.map((item) => {
            let activated = false;
            if (currentPage === item.tag) activated = true;

            return (
              <BtnSidebar
                tag={item.tag}
                icon={item.icon}
                style={activated ? 'bg-primary-main' : ''}
                key={item.key}
              />
            );
          })}
        </div>
      </div>
      <div className="text-xs text-accent-dark-tint-300">
        <p>Copyright © 2022</p>
        <p>Designed By Chen Yu</p>
        <p>All right reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
