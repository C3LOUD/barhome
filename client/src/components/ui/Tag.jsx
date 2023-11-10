import React from 'react';
import PropTypes from 'prop-types';

export default function Tag({ children }) {
  return (
    <div className="paragraph-xsmall whitespace-nowrap rounded-full bg-accent-dark-main px-2 font-secondary font-semibold text-accent-dark-tint-800">
      {children}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
};
