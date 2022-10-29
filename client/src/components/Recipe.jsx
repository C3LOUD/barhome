import React, { useCallback, useEffect, useRef, useState } from 'react';

import RecipeCard from './RecipeCard';
import useFetchRecipes from '../hooks/useFetchRecipes';

const Recipe = () => {
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

export default Recipe;
