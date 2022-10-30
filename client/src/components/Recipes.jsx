import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import drinkWithFriends from '../assets/drink-with-friends.png';
import RecipeCard from './RecipeCard';
import useFetchRecipes from '../hooks/useFetchRecipes';
import Modal from './Modal';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { recievedData, isLoading, totalQuantity, hasError } = useFetchRecipes({
    currentPage,
  });

  const observer = useRef();
  const reloadElementRef = useCallback(
    (recipe) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (recipe) observer.current.observe(recipe);
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    setAllRecipes((prev) => [...prev, ...recievedData]);
    if (allRecipes.length === totalQuantity) setHasMore(false);
  }, [recievedData]);

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div className="flex items-center gap-6 px-6 py-12">
        <img src={drinkWithFriends} alt="drink with friend" className="h-40" />
        <div className="flex flex-col gap-3">
          <p className="font-primary display-small font-bold text-white-100">
            No Idea What to Drink Today?
          </p>
          <div className="flex gap-9">
            <p className="font-primary heading-h3 font-bold text-white-100">
              Let us pick one for you
            </p>
            <a className="transition-all px-4 py-2 bg-primary-main heading-h6 font-bold text-white-400 rounded cursor-pointer hover:bg-primary-tint-100">
              Random
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-16 py-2 pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-main scrollbar-track-primary-tint-300 auto-rows-min">
        {allRecipes.map((recipe, i) => {
          if (allRecipes.length === i + 4) {
            return (
              <RecipeCard ref={reloadElementRef} recipe={recipe} key={i} />
            );
          }
          return <RecipeCard recipe={recipe} key={i} />;
        })}
      </div>
      <div className="text-center text-white-100 bg-warning">
        {isLoading && 'Loading'}
      </div>
      <div className="text-center text-white-100 bg-error">
        {hasError && 'Error'}
      </div>
    </>
  );
};

export default Recipes;
