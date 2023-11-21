import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchRecipeByIngredient } from '../../utils/api-list';
import Icon from '../ui/Icon';
import RecipeCard from '../ui/RecipeCard';

export default function RecipesSpirit({ spirit }) {
  const carousel = useRef();
  const [clientX, setClientX] = useState(0);

  const { data, isSuccess } = fetchRecipeByIngredient(spirit);

  const scrollHandler = () => {
    setClientX(carousel.current.scrollLeft);
  };

  const btnScrollHandler = (e) => {
    if (e.target.name === 'chevron-back-sharp') {
      carousel.current.scroll({
        left: clientX - carousel.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      carousel.current.scroll({
        left: carousel.current.offsetWidth + clientX,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <Link className="flex gap-2 pb-4" to={`/dashboard/ingredient/${spirit}`}>
        <p className="heading-h3 font-primary font-bold text-white-100 dark:text-black-100">
          {spirit}
        </p>
        <Icon
          name="chevron-forward-sharp"
          className="text-3xl text-white-100 dark:text-black-100"
        />
      </Link>
      <div
        className="grid-row-1 grid grid-flow-col gap-8 overflow-x-scroll py-2 scrollbar-none"
        ref={carousel}
        onScroll={scrollHandler}
      >
        {isSuccess &&
          data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
      </div>
      {clientX !== 0 && (
        <Icon
          name="chevron-back-sharp"
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary-main/30 px-2 py-2 text-3xl text-white-100 transition-all hover:bg-primary-main"
          onClick={btnScrollHandler}
        />
      )}
      {clientX === 0 && (
        <Icon
          name="chevron-forward-sharp"
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary-main/30 px-2 py-2 text-3xl text-white-100 transition-all hover:bg-primary-main"
          onClick={btnScrollHandler}
        />
      )}
      {clientX + carousel.current?.offsetWidth !==
        carousel.current?.scrollWidth && (
        <Icon
          name="chevron-forward-sharp"
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-primary-main/30 px-2 py-2 text-3xl text-white-100 transition-all hover:bg-primary-main"
          onClick={btnScrollHandler}
        />
      )}
    </div>
  );
}

RecipesSpirit.propTypes = {
  spirit: PropTypes.string.isRequired,
};
