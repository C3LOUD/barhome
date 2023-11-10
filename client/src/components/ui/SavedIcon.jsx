import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

export default function SavedIcon({ size }) {
  return (
    <Icon
      name="bookmark"
      style={`${size === 'small' ? 'text-2xl' : 'text-5xl'} text-primary-main`}
    />
  );
}

SavedIcon.propTypes = {
  size: PropTypes.string.isRequired,
};
