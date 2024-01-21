import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
        'after:toggle-btn bg-accent-dark-shade-700 hover:after:bg-primary-tint-200 dark:bg-accent-dark-shade-400 relative flex h-11 w-24 items-center justify-between rounded-full px-1 transition-all active:after:w-14 sm:px-2',
        !darkMode && 'after:left-24 after:-translate-x-full',
      )}
      onClick={darkModeSwitcher}
    >
      <span className="text-secondary-main hover:text-secondary-tint-100 dark:text-secondary-tint-300 z-10 flex cursor-pointer text-5xl sm:text-[24px]">
        <ion-icon name="moon-sharp" />
      </span>
      <span className="text-secondary-main hover:text-secondary-tint-100 dark:text-secondary-tint-300 z-10 flex cursor-pointer text-5xl sm:text-[24px]">
        <ion-icon name="sunny-sharp" />
      </span>
    </div>
  );
}
