import React from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

export default function TogglePosts({ filter, onClick }) {
  return (
    <>
      <Icon name="chevron-down-sharp" className="text-2xl" />
      <ul className="absolute top-5 left-0 flex w-full animate-dropdown flex-col gap-2 py-2 transition-all xs:z-10 xs:rounded xs:bg-accent-dark-shade-800/80 xs:py-2 dark:xs:bg-accent-dark-tint-300/80">
        <a
          className={twMerge(
            'paragraph-small font-secondary font-semibold transition-all hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2',
            (filter === 'all' || !filter) &&
              'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'all' });
          }}
        >
          All Posts
        </a>
        <a
          className={twMerge(
            'paragraph-small font-secondary font-semibold transition-all hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2',
            filter === 'liked' && 'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'liked' });
          }}
        >
          Liked Posts
        </a>
        <a
          className={twMerge(
            'paragraph-small font-secondary font-semibold transition-all hover:bg-primary-tint-200 dark:hover:bg-primary-tint-600 xs:px-2',
            filter === 'myposts' && 'bg-primary-main dark:bg-primary-tint-500',
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick({ filter: 'myposts' });
          }}
        >
          My Posts
        </a>
      </ul>
    </>
  );
}

TogglePosts.propTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
