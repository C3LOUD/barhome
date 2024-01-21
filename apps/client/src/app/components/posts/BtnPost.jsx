import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function BtnPost({ absPosition, onClick, text, type }) {
  return (
    <div
      className={twMerge(
        absPosition,
        'hover:bg-primary-main group absolute flex cursor-pointer items-center gap-2 rounded-full px-2 transition-all',
      )}
      onClick={onClick}
    >
      {text === 'Next' && (
        <p className="text-white-100 opacity-0 transition-all group-hover:opacity-100">
          {text}
        </p>
      )}
      <span className="text-accent-dark-main group-hover:text-white-100 flex text-3xl">
        <ion-icon name={type} />
      </span>
      {text === 'Previous' && (
        <p className="text-white-100 opacity-0 transition-all group-hover:opacity-100">
          {text}
        </p>
      )}
    </div>
  );
}

BtnPost.propTypes = {
  absPosition: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
