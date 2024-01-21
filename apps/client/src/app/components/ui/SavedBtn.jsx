import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { useSavedRecipe } from '../../utils/api-list';

export default function SavedBtn({ size }) {
  const [checkSaved, setCheckSaved] = useState(false);
  const savedRef = useRef();
  const { mutate } = useSavedRecipe();
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
    <button
      type="button"
      className={twMerge(
        'bg-white-100/50 hover:bg-white-100 absolute rounded-full shadow-md',
        size === 'small' ? 'left-1 top-1 px-1 py-1' : 'left-2 top-2 px-2 py-2',
      )}
      onClick={savedHandler}
      ref={savedRef}
    >
      {checkSaved ? (
        <span
          className={twMerge(
            size === 'small' ? 'text-2xl' : 'text-5xl',
            'text-primary-main flex',
          )}
        >
          <ion-icon name="bookmark" />
        </span>
      ) : (
        <span
          className={twMerge(
            size === 'small' ? 'text-2xl' : 'text-5xl',
            'text-primary-main flex',
          )}
        >
          <ion-icon name="bookmark-outline" />
        </span>
      )}
    </button>
  );
}

SavedBtn.propTypes = {
  size: PropTypes.string.isRequired,
};
