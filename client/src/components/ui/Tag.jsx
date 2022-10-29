import React from 'react';

const Tag = (props) => {
  return (
    <div className="bg-accent-dark-main px-2 text-accent-dark-tint-800 paragraph-xsmall font-secondary font-semibold rounded-full">
      {props.children}
    </div>
  );
};

export default Tag;
