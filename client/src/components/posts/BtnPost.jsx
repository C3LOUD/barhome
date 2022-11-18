import React from 'react';

import Icon from '../ui/Icon';

const BtnPost = (props) => {
  return (
    <div
      className={`${props.absPosition} group absolute flex cursor-pointer items-center gap-2 rounded-full px-2 transition-all hover:bg-primary-main`}
      onClick={props.onClick}
    >
      {props.text === 'Next' && (
        <p className="text-white-100 opacity-0 transition-all group-hover:opacity-100">
          {props.text}
        </p>
      )}
      <Icon
        name={props.type}
        style=" text-3xl text-accent-dark-main group-hover:text-white-100"
      />
      {props.text === 'Previous' && (
        <p className="text-white-100 opacity-0 transition-all group-hover:opacity-100">
          {props.text}
        </p>
      )}
    </div>
  );
};

export default BtnPost;
