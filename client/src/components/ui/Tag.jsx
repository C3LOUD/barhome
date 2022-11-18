import React from 'react';

const Tag = (props) => {
  return (
    <div className="paragraph-xsmall whitespace-nowrap rounded-full bg-accent-dark-main px-2 font-secondary font-semibold text-accent-dark-tint-800">
      {props.children}
    </div>
  );
};

export default Tag;
