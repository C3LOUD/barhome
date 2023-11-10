import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import { savedRecipe } from '../../utils/api-list';
import Icon from './Icon';
import SavedIcon from './SavedIcon';

export default function SavedBtn({ size }) {
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
      },
    );
  };

  useEffect(() => {
    setCheckSaved(
      saved.some(
        (el) => el === savedRef.current?.closest('[data-id]').dataset.id,
      ),
    );
  }, [saved]);

  return (
    <div
      className={twMerge(
        'absolute rounded-full bg-white-100/50 shadow-md hover:bg-white-100',
        size === 'small' ? 'top-1 left-1 px-1 py-1' : 'top-2 left-2 px-2 py-2',
      )}
      onClick={savedHandler}
      ref={savedRef}
    >
      {checkSaved ? (
        <SavedIcon size={size} />
      ) : (
        <Icon
          name="bookmark-outline"
          style={`${
            size === 'small' ? 'text-2xl' : 'text-5xl'
          } text-primary-main`}
        />
      )}
    </div>
  );
}

SavedBtn.propTypes = {
  size: PropTypes.string.isRequired,
};
