import React from 'react';
import Icon from './Icon';

export default function SavedIcon(props) {
  return (
    <Icon
      name="bookmark"
      style={`${
        props.size === 'small' ? 'text-2xl' : 'text-5xl'
      } text-primary-main`}
    />
  );
}
