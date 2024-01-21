import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export default function BtnSidebar({ tag, style, icon }) {
  const link = tag.toLowerCase();

  return (
    <Link
      to={link}
      data-id={tag}
      className={twMerge(
        'sm:heading-h6 text-white-100 hover:bg-primary-tint-200 active:bg-primary-main flex w-full items-center gap-2 px-12 py-2 font-semibold transition-all hover:cursor-pointer hover:underline',
        style,
      )}
    >
      <span className="flex text-2xl sm:text-5xl">
        <ion-icon name={icon} />
      </span>
      {tag}
    </Link>
  );
}

BtnSidebar.propTypes = {
  tag: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
