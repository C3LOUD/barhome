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

export default function Spirits() {
  return (
    <>
      <Routes>
        <Route path=":id" element={<Modal />} />
      </Routes>
      <div className="xs:py-8 py-12">
        <p className="display-small font-primary text-white-100 dark:text-black-100 pb-4 font-bold ">
          Spirits
        </p>
        <div className="xs:mb-4 xs:grid xs:w-fit xs:grid-cols-5 xs:gap-y-2 2xs:gap-x-2 flex gap-8">
          {spiritsList.map((spirit) => (
            <Link
              key={spirit}
              className="heading-h6 font-primary text-white-100 hover:text-white-400 dark:text-black-100 xs:last:col-span-2 underline dark:hover:text-gray-400"
              to={`/dashboard/ingredient/${spirit}`}
            >
              {spirit}
            </Link>
          ))}
        </div>
      </div>
      <div className="scrollbar-none xs:gap-8 flex min-h-[20rem] flex-1 flex-col gap-16 overflow-y-auto xl:gap-12">
        {spiritsList.map((spirit) => (
          <RecipesSpirit key={spirit} spirit={spirit} />
        ))}
      </div>
    </>
  );
}
