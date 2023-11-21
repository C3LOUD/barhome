import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { fetchRecipeByIngredient } from '../../utils/api-list';
import Icon from '../ui/Icon';
import MainGrid from '../ui/MainGrid';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

export default function IngredientSpirit() {
  const { ingredient } = useParams();

  const { data, isSuccess } = fetchRecipeByIngredient(ingredient);

  return (
    <>
      <Routes>
        <Route path=":id" element={<Modal />} />
      </Routes>
      <div className="pt-10 pb-12 xs:pt-6 xs:pb-8">
        <Link to="/dashboard/spirits" className="group flex w-fit items-center">
          <Icon
            name="chevron-back-sharp"
            className="text-2xl text-white-100/50 group-hover:text-white-100 dark:text-gray-400 dark:group-hover:text-primary-main"
          />
          <p className="paragraph-xsmall font-secondary font-semibold text-white-100/50 group-hover:text-white-100 dark:text-gray-400 dark:group-hover:text-primary-main">
            Spirits
          </p>
        </Link>
        <p className="display-small font-primary font-bold text-white-100 dark:text-black-100">
          {ingredient}
        </p>
      </div>
      <MainGrid>
        {isSuccess &&
          data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
      </MainGrid>
    </>
  );
}
