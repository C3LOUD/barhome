import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetchRecipeByIngredient } from '../../utils/api-list';
import Icon from '../ui/Icon';
import RecipeCard from '../ui/RecipeCard';

export default function RecipesSpirit({ spirit }) {
  const carousel = useRef();
  const [clientX, setClientX] = useState(0);

  const { data, isSuccess } = useFetchRecipeByIngredient(spirit);

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
        <p className="heading-h3 font-primary text-white-100 dark:text-black-100 font-bold">
          {spirit}
        </p>
        <Icon
          name="chevron-forward-sharp"
          className="text-white-100 dark:text-black-100 text-3xl"
        />
      </Link>
      <div
        className="grid-row-1 scrollbar-none grid grid-flow-col gap-8 overflow-x-auto py-2"
        ref={carousel}
        onScroll={scrollHandler}
      >
        {isSuccess &&
          data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} index={i} />
          ))}
      </div>
      {clientX !== 0 && (
        <Icon
          name="chevron-back-sharp"
          className="bg-primary-main/30 text-white-100 hover:bg-primary-main absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full px-2 py-2 text-3xl transition-all"
          onClick={btnScrollHandler}
        />
      )}
      {clientX === 0 && (
        <Icon
          name="chevron-forward-sharp"
          className="bg-primary-main/30 text-white-100 hover:bg-primary-main absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full px-2 py-2 text-3xl transition-all"
          onClick={btnScrollHandler}
        />
      )}
      {clientX + carousel.current?.offsetWidth !==
        carousel.current?.scrollWidth && (
        <Icon
          name="chevron-forward-sharp"
          className="bg-primary-main/30 text-white-100 hover:bg-primary-main absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full px-2 py-2 text-3xl transition-all"
          onClick={btnScrollHandler}
        />
      )}
    </div>
  );
}

RecipesSpirit.propTypes = {
  spirit: PropTypes.string.isRequired,
};
