import React from 'react';
import PropTypes from 'prop-types';

export default function ModalCard({ children }) {
  return (
    <div
      className="bg-white-100 scrollbar-none relative flex h-full max-h-[47rem] w-full max-w-[60rem] cursor-default flex-col items-center overflow-y-auto rounded py-4 pb-6 pt-10"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

ModalCard.propTypes = {
  children: PropTypes.node.isRequired,
};
