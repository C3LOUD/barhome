import React from 'react';

const ModalCard = (props) => {
  return (
    <div
      className="w-9/12 h-min-4/5 bg-white-100 rounded flex flex-col justify-between items-center pt-10 pb-6"
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
};

export default ModalCard;
