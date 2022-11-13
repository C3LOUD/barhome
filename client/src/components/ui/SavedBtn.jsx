import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { adminActions } from '../../store/admin-slice';
import { savedRecipe } from '../../utils/api-list';
import Icon from './Icon';

const SavedBtn = (props) => {
  const [checkSaved, setCheckSaved] = useState(false);
  const savedRef = useRef();
  const { mutateAsync } = savedRecipe();

  const { saved } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const savedHandler = async (e) => {
    e.stopPropagation();
    await mutateAsync({
      title: savedRef.current.closest('[data-id]').dataset.id,
    });
    dispatch(
      adminActions.updateSaved(
        savedRef.current?.closest('[data-id]').dataset.id
      )
    );
  };

  useEffect(() => {
    setCheckSaved(
      saved.some(
        (el) => el === savedRef.current?.closest('[data-id]').dataset.id
      )
    );
  }, [saved]);

  return (
    <div
      className={`absolute ${
        props.size === 'small'
          ? 'top-1 left-1 px-1 py-1'
          : 'top-2 left-2 px-2 py-2'
      } bg-white-100/50 rounded-full shadow-md hover:bg-white-100`}
      onClick={savedHandler}
      ref={savedRef}
    >
      <Icon
        name={checkSaved ? 'bookmark' : 'bookmark-outline'}
        style={`${
          props.size === 'small' ? 'text-2xl' : 'text-5xl'
        } text-primary-main`}
      />
    </div>
  );
};

export default SavedBtn;
