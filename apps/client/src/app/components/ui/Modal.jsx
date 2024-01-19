import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import InitialModalContext from '../../store/initial-Modal-context';
import NewPost from '../posts/NewPost';
import PostEditor from '../posts/PostEditor';
import Recipe from '../recipe/Recipe';

export default function Modal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const onEditHandler = () => {
    setSearchParams({ isEditing: true });
  };

  const ctx = useContext(InitialModalContext);
  const jsx = (
    <div
      className="absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center overflow-hidden bg-accent-dark-shade-800/80 py-8 xl:px-8 2xs:py-4 2xs:px-4"
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
}
