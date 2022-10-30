import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import InitialContext from '../store/initial-context';
import Recipe from './Recipe';

const Modal = () => {
  const navigate = useNavigate();
  const onEdit = (isEditing) => {
    return isEditing;
  };

  const ctx = useContext(InitialContext);
  const jsx = (
    <div
      className="z-10 absolute flex justify-center items-center w-full h-full py-12 top-0 left-0 bg-accent-dark-shade-800/80 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <Recipe onEdit={onEdit} />
      {onEdit && <p>isEditing</p>}
    </div>
  );

  return <>{ctx ? createPortal(jsx, ctx) : null}</>;
};

export default Modal;
