import React, { forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import SavedBtn from './SavedBtn';
import Tag from './Tag';

const RecipeCard = forwardRef(({ recipe, index }, ref) => {
  const { title, thumbnail, alcoholic, category } = recipe;

  const tagsContent = [alcoholic, category];

  const navigate = useNavigate();
  const location = useLocation();

  const navigateHandler = (e) => {
    navigate(
      `${location.pathname}/${
        e.target.closest('[data-id]').dataset.id
      }?isEditing=false`,
    );
  };

  return (
    <div
      className="flex w-full min-w-[15.5rem] cursor-pointer flex-col items-center justify-between gap-4 overflow-hidden rounded bg-white-100 pt-4 transition-all hover:-translate-y-2 hover:bg-white-200 dark:shadow-md xl:gap-3 2xs:mx-auto 2xs:max-w-[15.5rem]"
      ref={ref}
      role="link"
      tabIndex={index}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        navigateHandler(e);
      }}
      onClick={navigateHandler}
      data-id={title}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt="cocktail thumbnail"
          className="inline-block w-44"
        />
        <SavedBtn size="small" />
      </div>
      <div className="flex gap-2">
        {tagsContent.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
      <p className="heading-h3 text-center font-primary font-bold">{title}</p>
      <p className="w-full cursor-pointer bg-primary-main py-2 text-center font-secondary font-semibold text-white-400 hover:bg-primary-tint-200 ">
        Start Mixing
      </p>
    </div>
  );
});

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    alcoholic: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;
