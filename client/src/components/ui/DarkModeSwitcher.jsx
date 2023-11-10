import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from './Icon';

export default function DarkModeSwitcher() {
  const [darkMode, setDarkMode] = useState(true);

  const htmlClassList = document.documentElement.classList;

  const darkModeSwitcher = (e) => {
    e.preventDefault();
    setDarkMode((prev) => !prev);
    if ([...htmlClassList].some((el) => el === 'dark')) {
      htmlClassList.remove('dark');
    } else {
      htmlClassList.add('dark');
    }
  };

  return (
    <div
      className={twMerge(
        'after:toggle-btn relative flex h-11 w-24 items-center justify-between rounded-full bg-accent-dark-shade-700 px-1 transition-all hover:after:bg-primary-tint-200 active:after:w-14 dark:bg-accent-dark-shade-400 sm:px-2',
        !darkMode && 'after:left-24 after:-translate-x-full',
      )}
      onClick={darkModeSwitcher}
    >
      <Icon
        name="moon-sharp"
        style="text-secondary-main text-5xl cursor-pointer hover:text-secondary-tint-100 z-10 dark:text-secondary-tint-300 sm:text-[24px]"
      />
      <Icon
        name="sunny-sharp"
        style="text-secondary-main text-5xl cursor-pointer hover:text-secondary-tint-100 z-10 dark:text-secondary-tint-300 sm:text-[24px]"
      />
    </div>
  );
}
