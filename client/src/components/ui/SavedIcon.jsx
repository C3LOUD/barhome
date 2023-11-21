import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from './Icon';

export default function SavedIcon({ size }) {
  return (
    <Icon
      name="bookmark"
      className={twMerge(
        size === 'small' ? 'text-2xl' : 'text-5xl',
        'text-primary-main',
      )}
    />
  );
}

SavedIcon.propTypes = {
  size: PropTypes.string.isRequired,
};
