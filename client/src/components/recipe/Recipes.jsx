import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import drinkWithFriends from '../../assets/drink-with-friends.png';
import { fetchAllRecipes, fetchRandomRecipe } from '../../utils/api-list';
import Loading from '../ui/Loading';
import MainGrid from '../ui/MainGrid';
import Modal from '../ui/Modal';
import RecipeCard from '../ui/RecipeCard';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, isError, error, data } = fetchAllRecipes(currentPage);
  const { data: randomData, refetch } = fetchRandomRecipe();

  const navigate = useNavigate();

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
    if (!data) return;
    setAllRecipes((prev) => [...prev, ...data.recipes]);
    if (allRecipes.length === data.totalRecipes) setHasMore(false);
  }, [data]);

  const randomHandler = async (e) => {
    e.preventDefault();
    await refetch();
    navigate(`/dashboard/recipes/${randomData.title}?isEditing=false`);
  };

  isLoading && (
    <div className="bg-warning text-center text-white-100">
      <Loading />
    </div>
  );

  isError && <div className="bg-error text-center text-white-100">{error}</div>;

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div className="flex items-center gap-6 px-6 py-12 xl:py-8 xs:py-6">
        <img
          src={drinkWithFriends}
          alt="drink with friend"
          className="h-40 md:h-32 xs:hidden"
        />
        <div className="flex flex-col gap-3">
          <p className="display-small xl:heading-h1 2xs:heading-h3 font-primary font-bold text-white-100 dark:text-black-100">
            No Idea What to Drink Today?
          </p>
          <div className="flex gap-9 2xs:flex-col 2xs:gap-4">
            <p className="heading-h3 xl:heading-h4 2xs:heading-h6 font-primary font-bold text-white-100 dark:text-black-100">
              Let us pick one for you
            </p>
            <a
              className="heading-h6 xl:paragraph-large 2xs:paragraph-medium w-fit cursor-pointer rounded bg-primary-main px-4 py-2 font-bold text-white-400 transition-all hover:bg-primary-tint-200"
              onClick={randomHandler}
            >
              Random
            </a>
          </div>
        </div>
      </div>
      <MainGrid>
        {allRecipes.map((recipe, i) => {
          if (allRecipes.length === i + 4) {
            return (
              <RecipeCard ref={reloadElementRef} recipe={recipe} key={i} />
            );
          }
          return <RecipeCard recipe={recipe} key={i} />;
        })}
      </MainGrid>
    </>
  );
};

export default Recipes;
