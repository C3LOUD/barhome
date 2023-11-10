import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { fetchSavedRecipes } from '../../utils/api-list';
import Icon from '../ui/Icon';
import MainGrid from '../ui/MainGrid';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

export default function Saved() {
  const { data, isSuccess } = fetchSavedRecipes();

  return (
    <>
      <Routes>
        <Route path=":id" element={<Modal />} />
      </Routes>
      <p className="display-small my-12 font-primary font-bold text-white-100 dark:text-black-100 xl:my-8 2xs:my-6">
        Saved
      </p>
      {isSuccess && data.recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-12">
          <p className="display-large font-primary font-bold text-white-400">
            No Saved Recipe Found
          </p>
          <Link
            className="group flex items-center gap-6"
            to="/dashboard/recipes"
          >
            <p className="heading-h2 font-primary font-bold text-white-100 decoration-1 underline-offset-4 transition-all group-hover:text-white-400 group-hover:underline">
              Explore new recipe
            </p>
            <Icon
              name="arrow-forward-sharp"
              style="transition-all text-5xl text-white-100 group-hover:text-white-400"
            />
          </Link>
        </div>
      )}
      {isSuccess && (
        <MainGrid>
          {data.recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe._id} />
          ))}
        </MainGrid>
      )}
    </>
  );
}
