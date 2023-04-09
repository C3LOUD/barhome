import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Modal from '../ui/Modal';
import RecipesSpirit from './RecipesSpirit';

const spiritsList = [
  'Tequila',
  'Vodka',
  'Rum',
  'Gin',
  'Bourbon',
  'Scotch',
  'Cognac',
  'Brandy',
  'Rye Whiskey',
];

const Spirits = () => {
  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div className="py-12 xs:py-8">
        <p className="display-small pb-4 font-primary font-bold text-white-100 dark:text-black-100 ">
          Spirits
        </p>
        <div className="flex gap-8 xs:mb-4 xs:grid xs:w-fit xs:grid-cols-5 xs:gap-y-2 2xs:gap-x-2">
          {spiritsList.map((spirit) => {
            return (
              <Link
                key={spirit}
                className="heading-h6 font-primary text-white-100 underline hover:text-white-400 dark:text-black-100 dark:hover:text-gray-400 xs:last:col-span-2"
                to={`/dashboard/ingredient/${spirit}`}
              >
                {spirit}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex min-h-[20rem] flex-1 flex-col gap-16 overflow-x-hidden overflow-y-scroll scrollbar-none xl:gap-12 xs:gap-8">
        {spiritsList.map((spirit) => (
          <RecipesSpirit key={spirit} spirit={spirit} />
        ))}
      </div>
    </>
  );
};

export default Spirits;
