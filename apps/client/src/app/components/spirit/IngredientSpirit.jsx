import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { useFetchRecipeByIngredient } from '../../utils/api-list';
import MainGrid from '../ui/MainGrid';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

export default function IngredientSpirit() {
  const { ingredient } = useParams();

  const { data, isSuccess } = useFetchRecipeByIngredient(ingredient);

  return (
    <>
      <Routes>
        <Route path=":id" element={<Modal />} />
      </Routes>
      <div className="xs:pb-8 xs:pt-6 pb-12 pt-10">
        <Link to="/dashboard/spirits" className="group flex w-fit items-center">
          <button className="text-white-100/50 group-hover:text-white-100 dark:group-hover:text-primary-main flex text-2xl dark:text-gray-400">
            <ion-icon name="chevron-back-sharp" />
          </button>
          <p className="paragraph-xsmall font-secondary text-white-100/50 group-hover:text-white-100 dark:group-hover:text-primary-main font-semibold dark:text-gray-400">
            Spirits
          </p>
        </Link>
        <p className="display-small font-primary text-white-100 dark:text-black-100 font-bold">
          {ingredient}
        </p>
      </div>
      <MainGrid>
        {isSuccess &&
          data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} index={i} />
          ))}
      </MainGrid>
    </>
  );
}
