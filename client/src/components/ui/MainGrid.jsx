import React from 'react';
import PropTypes from 'prop-types';

export default function MainGrid({ children }) {
  return (
    <div className="grid min-h-[20rem] auto-rows-min grid-cols-4 gap-x-8 gap-y-16 overflow-x-hidden overflow-y-scroll py-2 pr-4 scrollbar-thin scrollbar-track-primary-tint-300 scrollbar-thumb-primary-main 2xl:w-full xl:grid-cols-3 xl:gap-y-12 sm:gap-y-8 xs:grid-cols-2 xs:gap-y-6 2xs:grid-cols-1 2xs:pr-0 2xs:scrollbar-none">
      {children}
    </div>
  );
}

MainGrid.propTypes = {
  children: PropTypes.node.isRequired,
};
