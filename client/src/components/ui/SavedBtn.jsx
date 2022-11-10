import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { savedRecipe } from '../../utils/api-list';
import { authActions } from '../../store/auth-slice';
import Icon from './Icon';

const SavedBtn = (props) => {
  const [checkSaved, setCheckSaved] = useState(false);
  const savedRef = useRef();
  const { mutateAsync } = savedRecipe();

  const { saved } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const savedHandler = async (e) => {
    e.stopPropagation();
    await mutateAsync({
      title: savedRef.current.closest('[data-id]').dataset.id,
    });
    dispatch(
      authActions.updateSaved(savedRef.current?.closest('[data-id]').dataset.id)
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
      className={`absolute top-${props.size} left-${props.size} bg-white-100/50 rounded-full px-${props.size} py-${props.size} shadow-md hover:bg-white-100`}
      onClick={savedHandler}
      ref={savedRef}
    >
      <Icon
        name={checkSaved ? 'bookmark' : 'bookmark-outline'}
        style={`text-${3 * props.size - 1}xl text-primary-main`}
      />
    </div>
  );
};

export default SavedBtn;
