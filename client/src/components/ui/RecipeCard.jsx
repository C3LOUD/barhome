import React, { forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SavedBtn from './SavedBtn';
import Tag from './Tag';

const RecipeCard = forwardRef((props, ref) => {
  const { title, thumbnail, alcoholic, category } = props.recipe;

  const tagsContent = [alcoholic, category];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex w-full min-w-[15.5rem] cursor-pointer flex-col items-center justify-between gap-4 overflow-hidden rounded bg-white-100 pt-4 transition-all hover:-translate-y-2 hover:bg-white-200 dark:shadow-md xl:gap-3 2xs:mx-auto 2xs:max-w-[15.5rem]"
      ref={ref}
      onClick={(e) => {
        navigate(
          `${location.pathname}/${
            e.target.closest('[data-id]').dataset.id
          }?isEditing=false`
        );
      }}
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
      <a className="w-full cursor-pointer bg-primary-main py-2 text-center font-secondary font-semibold text-white-400 hover:bg-primary-tint-200 ">
        Start Mixing
      </a>
    </div>
  );
});

export default RecipeCard;
