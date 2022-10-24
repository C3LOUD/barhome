import React from 'react';
import Icon from './Icon';

const BtnSidebar = (props) => {
  return (
    <a data-id={props.tag} className={`sidemenu--btn ` + props.style}>
      <Icon name={props.icon} style="text-2xl" />
      {props.tag}
    </a>
  );
};

export default BtnSidebar;
