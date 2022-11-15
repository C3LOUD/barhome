import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import { fetchSavedRecipes } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

const Saved = () => {
  const { data, isSuccess, refetch } = fetchSavedRecipes();
  const { saved } = useSelector((state) => state.admin);

  useEffect(() => {
    refetch();
  }, [saved]);

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <p className="font-primary display-small font-bold text-white-100 my-12">
        Saved
      </p>
      {isSuccess && data.recipes.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-12">
          <p className="font-primary display-large font-bold text-white-400">
            No Saved Recipe Found
          </p>
          <Link
            className="flex gap-6 items-center group"
            to="/dashboard/recipes"
          >
            <p className="transition-all font-primary heading-h2 font-bold text-white-100 group-hover:text-white-400 group-hover:underline underline-offset-4 decoration-1">
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
        <div className="flex-1 grid grid-cols-4 gap-x-8 gap-y-16 py-2 pr-4 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-main scrollbar-track-primary-tint-300 auto-rows-min">
          {data.recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Saved;
