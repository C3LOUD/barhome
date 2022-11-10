import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';

import InitialModalContext from '../../store/initial-Modal-context';
import Recipe from '../recipe/Recipe';
import NewPost from '../posts/NewPost';

const Modal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onEditHandler = () => {
    setSearchParams({ isEditing: true });
  };

  const ctx = useContext(InitialModalContext);
  const jsx = (
    <div
      className="z-10 absolute flex justify-center items-center w-full h-full top-0 left-0 bg-accent-dark-shade-800/80 cursor-pointer"
      onClick={() =>
        searchParams.get('isEditing') === 'true' ? navigate(-2) : navigate(-1)
      }
    >
      {searchParams.get('isEditing') === 'true' ? (
        <NewPost />
      ) : (
        <Recipe onEdit={onEditHandler} />
      )}
    </div>
  );

  return <>{ctx ? createPortal(jsx, ctx) : null}</>;
};

export default Modal;
