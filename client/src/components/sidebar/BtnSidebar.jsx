import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../ui/Icon';

const BtnSidebar = (props) => {
  const link = props.tag.toLowerCase();

  return (
    <Link
      to={link}
      data-id={props.tag}
      className={
        `sm:heading-h6 flex w-full items-center gap-2 py-2 px-12 font-semibold text-white-100 transition-all hover:cursor-pointer hover:bg-primary-tint-200 hover:underline active:bg-primary-main ` +
        props.style
      }
    >
      <Icon name={props.icon} style="text-2xl sm:text-5xl" />
      {props.tag}
    </Link>
  );
};

export default BtnSidebar;
