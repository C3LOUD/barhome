import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { savedRecipe } from '../../utils/api-list';
import Icon from './Icon';
import SavedIcon from './SavedIcon';

const SavedBtn = (props) => {
  const [checkSaved, setCheckSaved] = useState(false);
  const savedRef = useRef();
  const { mutate } = savedRecipe();
  const queryClient = useQueryClient();

  const { saved } = useSelector((state) => state.admin);

  const savedHandler = (e) => {
    e.stopPropagation();
    mutate(
      {
        title: savedRef.current.closest('[data-id]').dataset.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['saved']);
          queryClient.invalidateQueries(['user']);
        },
      }
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
      } rounded-full bg-white-100/50 shadow-md hover:bg-white-100`}
      onClick={savedHandler}
      ref={savedRef}
    >
      {checkSaved ? (
        <SavedIcon size={props.size} />
      ) : (
        <Icon
          name="bookmark-outline"
          style={`${
            props.size === 'small' ? 'text-2xl' : 'text-5xl'
          } text-primary-main`}
        />
      )}
    </div>
  );
};

export default SavedBtn;
