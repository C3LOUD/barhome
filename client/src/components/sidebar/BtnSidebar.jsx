import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import Icon from '../ui/Icon';

export default function BtnSidebar({ tag, style, icon }) {
  const link = tag.toLowerCase();

  return (
    <Link
      to={link}
      data-id={tag}
      className={twMerge(
        'sm:heading-h6 flex w-full items-center gap-2 py-2 px-12 font-semibold text-white-100 transition-all hover:cursor-pointer hover:bg-primary-tint-200 hover:underline active:bg-primary-main',
        style,
      )}
    >
      <Icon name={icon} style="text-2xl sm:text-5xl" />
      {tag}
    </Link>
  );
}
