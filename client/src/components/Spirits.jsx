import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import RecipesSpirit from './spirit/RecipesSpirit';
import Modal from './ui/Modal';

const spiritsList = [
  'Tequila',
  'Vodka',
  'Rum',
  'Gin',
  'Bourbon',
  'Scotch',
  'Rye Whiskey',
  'Cognac',
  'Brandy',
];

const Spirits = () => {
  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div className="py-12">
        <p className="font-primary text-white-100 display-small font-bold pb-4">
          Spirits
        </p>
        <div className="flex gap-8">
          {spiritsList.map((spirit) => {
            return (
              <Link
                key={spirit}
                className="font-primary heading-h6 text-white-100 underline"
                to={`/dashboard/ingredient/${spirit}`}
              >
                {spirit}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="overflow-y-scroll scrollbar-none flex flex-col gap-16 flex-1">
        {spiritsList.map((spirit) => (
          <RecipesSpirit key={spirit} spirit={spirit} />
        ))}
      </div>
    </>
  );
};

export default Spirits;
