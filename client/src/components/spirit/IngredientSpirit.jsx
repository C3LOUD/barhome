import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import Icon from '../ui/Icon';
import { fetchRecipeByIngredient } from '../../utils/api-list';
import RecipeCard from '../ui/RecipeCard';
import Modal from '../ui/Modal';

const IngredientSpirit = () => {
  const { ingredient } = useParams();

  const { data, isSuccess } = fetchRecipeByIngredient(ingredient);

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div className="pt-10 pb-12">
        <Link to="/dashboard/spirits" className="flex items-center group w-fit">
          <Icon
            name="chevron-back-sharp"
            style="text-white-100/50 text-2xl group-hover:text-white-100 "
          />
          <p className="font-secondary paragraph-xsmall font-semibold text-white-100/50 group-hover:text-white-100 ">
            Spirits
          </p>
        </Link>
        <p className="font-primary display-small font-bold text-white-100">
          {ingredient}
        </p>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-x-8 gap-y-16 py-2 pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-main scrollbar-track-primary-tint-300 auto-rows-min">
        {isSuccess &&
          data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
      </div>
    </>
  );
};

export default IngredientSpirit;
