import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import InitialModalContext from '../../store/initial-Modal-context';
import NewPost from '../posts/NewPost';
import PostEditor from '../posts/PostEditor';
import Recipe from '../recipe/Recipe';

const Modal = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const onEditHandler = () => {
    setSearchParams({ isEditing: true });
  };

  const ctx = useContext(InitialModalContext);
  const jsx = (
    <div
      className="z-10 absolute flex justify-center items-center w-full h-full top-0 left-0 bg-accent-dark-shade-800/80 cursor-pointer"
      onClick={() =>
        navigate(location.pathname.split('/').slice(0, -1).join('/'))
      }
    >
      {searchParams.get('mode') === 'post' ? (
        <PostEditor />
      ) : searchParams.get('isEditing') === 'true' ? (
        <NewPost />
      ) : (
        <Recipe onEdit={onEditHandler} />
      )}
    </div>
  );

  return <>{ctx ? createPortal(jsx, ctx) : null}</>;
};

export default Modal;
