import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function TogglePosts({ filter, onClick }) {
  return (
    <>
      <span className="flex text-2xl">
        <ion-icon name="chevron-down-sharp" />
      </span>
      <ul className="animate-dropdown xs:z-10 xs:rounded xs:bg-accent-dark-shade-800/80 xs:py-2 dark:xs:bg-accent-dark-tint-300/80 absolute left-0 top-5 flex w-full flex-col gap-2 py-2 transition-all">
        <button
          className={twMerge(
            'paragraph-small font-secondary hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2 font-semibold transition-all',
            (filter === 'all' || !filter) &&
              'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'all' });
          }}
        >
          All Posts
        </button>
        <button
          className={twMerge(
            'paragraph-small font-secondary hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2 font-semibold transition-all',
            filter === 'liked' && 'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'liked' });
          }}
        >
          Liked Posts
        </button>
        <button
          className={twMerge(
            'paragraph-small font-secondary hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2 font-semibold transition-all',
            filter === 'myposts' && 'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'myposts' });
          }}
        >
          My Posts
        </button>
      </ul>
    </>
  );
}

TogglePosts.propTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
