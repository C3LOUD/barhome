import React from 'react';

import Icon from '../ui/Icon';

const BtnPost = (props) => {
  return (
    <div
      className={`${props.absPosition} absolute cursor-pointer hover:bg-primary-main flex items-center gap-2 transition-all group rounded-full px-2`}
      onClick={props.onClick}
    >
      {props.text === 'Next' && (
        <p className="opacity-0 transition-all text-white-100 group-hover:opacity-100">
          {props.text}
        </p>
      )}
      <Icon
        name={props.type}
        style=" text-3xl text-accent-dark-main group-hover:text-white-100"
      />
      {props.text === 'Previous' && (
        <p className="opacity-0 transition-all text-white-100 group-hover:opacity-100">
          {props.text}
        </p>
      )}
    </div>
  );
};

export default BtnPost;
