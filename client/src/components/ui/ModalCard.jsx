import React from 'react';

const ModalCard = (props) => {
  return (
    <div
      className="bg-white-100 rounded flex flex-col justify-between items-center pt-10 pb-6 cursor-default max-w-[60rem] w-full h-full max-h-[47rem]"
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
};

export default ModalCard;
