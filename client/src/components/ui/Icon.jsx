import React from 'react';

const Icon = (props) => {
  return (
    <div className="flex items-center justify-center">
      <ion-icon name={props.name} class={props.style} />
    </div>
  );
};

export default Icon;
