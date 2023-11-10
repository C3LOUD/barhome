import React from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

export default function BtnPost({ absPosition, onClick, text, type }) {
  return (
    <div
      className={twMerge(
        absPosition,
        'group absolute flex cursor-pointer items-center gap-2 rounded-full px-2 transition-all hover:bg-primary-main',
      )}
      onClick={onClick}
    >
      {text === 'Next' && (
        <p className="text-white-100 opacity-0 transition-all group-hover:opacity-100">
          {text}
        </p>
      )}
      <Icon
        name={type}
        style="text-3xl text-accent-dark-main group-hover:text-white-100"
      />
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
