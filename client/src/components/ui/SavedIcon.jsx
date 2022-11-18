import React from 'react';
import Icon from './Icon';

const SavedIcon = (props) => {
  return (
    <Icon
      name="bookmark"
      style={`${
        props.size === 'small' ? 'text-2xl' : 'text-5xl'
      } text-primary-main`}
    />
  );
};

export default SavedIcon;
