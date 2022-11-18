import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchRecipeByIngredient } from '../../utils/api-list';
import Icon from '../ui/Icon';
import RecipeCard from '../ui/RecipeCard';

const RecipesSpirit = (props) => {
  const carousel = useRef();
  const [clientX, setClientX] = useState(0);

  const { data, isSuccess } = fetchRecipeByIngredient(props.spirit);

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
      <Link
        className="flex gap-2 pb-4"
        to={`/dashboard/ingredient/${props.spirit}`}
      >
        <p className="heading-h3 font-primary font-bold text-white-100 dark:text-black-100">
          {props.spirit}
        </p>
        <Icon
          name="chevron-forward-sharp"
          style="text-white-100 text-3xl dark:text-black-100"
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
          style="transition-all text-white-100 text-3xl absolute top-1/2 -translate-y-1/2 z-10 left-0 bg-primary-main/30 rounded-full px-2 py-2 hover:bg-primary-main cursor-pointer"
          onClick={btnScrollHandler}
        />
      )}
      {clientX === 0 && (
        <Icon
          name="chevron-forward-sharp"
          style="transition-all text-white-100 text-3xl absolute top-1/2 -translate-y-1/2 z-10 right-0 bg-primary-main/30 rounded-full px-2 py-2 hover:bg-primary-main cursor-pointer"
          onClick={btnScrollHandler}
        />
      )}
      {clientX + carousel.current?.offsetWidth !==
        carousel.current?.scrollWidth && (
        <Icon
          name="chevron-forward-sharp"
          style="transition-all text-white-100 text-3xl absolute top-1/2 -translate-y-1/2 z-10 right-0 bg-primary-main/30 rounded-full px-2 py-2 hover:bg-primary-main cursor-pointer"
          onClick={btnScrollHandler}
        />
      )}
    </div>
  );
};

export default RecipesSpirit;
