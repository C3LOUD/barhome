import React from 'react';
import PropTypes from 'prop-types';

export default function MainGrid({ children }) {
  return (
    <div className="scrollbar-thin scrollbar-track-primary-tint-300 scrollbar-thumb-primary-main xs:grid-cols-2 xs:gap-y-6 2xs:grid-cols-1 2xs:pr-0 2xs:scrollbar-none grid min-h-[20rem] auto-rows-min grid-cols-4 gap-x-8 gap-y-16 overflow-y-auto py-2 pr-4 sm:gap-y-8 xl:grid-cols-3 xl:gap-y-12 2xl:w-full">
      {children}
    </div>
  );
}

MainGrid.propTypes = {
  children: PropTypes.node.isRequired,
};
