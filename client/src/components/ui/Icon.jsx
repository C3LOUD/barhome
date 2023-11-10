import React from 'react';

export default function Icon(props) {
  return (
    <div className="flex items-center justify-center" onClick={props.onClick}>
      <ion-icon name={props.name} class={props.style} />
    </div>
  );
}
