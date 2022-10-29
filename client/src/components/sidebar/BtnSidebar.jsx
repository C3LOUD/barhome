import React from 'react';

import Icon from '../ui/Icon';

const BtnSidebar = (props) => {
  return (
    <a
      data-id={props.tag}
      className={
        `transition-all py-2 pl-12 font-semibold text-white-100 paragraph-large flex items-center gap-2 w-full hover:bg-primary-tint-200 hover:underline hover:cursor-pointer active:bg-primary-main ` +
        props.style
      }
    >
      <Icon name={props.icon} style="text-2xl" />
      {props.tag}
    </a>
  );
};

export default BtnSidebar;
