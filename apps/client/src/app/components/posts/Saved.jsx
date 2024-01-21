import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useFetchSavedRecipes } from '../../utils/api-list';
import MainGrid from '../ui/MainGrid';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

export default function Saved() {
  const { data, isSuccess } = useFetchSavedRecipes();

  return (
    <>
      <Routes>
        <Route path=":id" element={<Modal />} />
      </Routes>
      <p className="display-small font-primary text-white-100 dark:text-black-100 2xs:my-6 my-12 font-bold xl:my-8">
        Saved
      </p>
      {isSuccess && data.recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-12">
          <p className="display-large font-primary text-white-400 font-bold">
            No Saved Recipe Found
          </p>
          <Link
            className="group flex items-center gap-6"
            to="/dashboard/recipes"
          >
            <p className="heading-h2 font-primary text-white-100 group-hover:text-white-400 font-bold decoration-1 underline-offset-4 transition-all group-hover:underline">
              Explore new recipe
            </p>
            <span className="text-white-100 group-hover:text-white-400 flex text-5xl transition-all">
              <ion-icon name="arrow-forward-sharp" />
            </span>
          </Link>
        </div>
      )}
      {isSuccess && (
        <MainGrid>
          {data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={recipe._id} index={i} />
          ))}
        </MainGrid>
      )}
    </>
  );
}
