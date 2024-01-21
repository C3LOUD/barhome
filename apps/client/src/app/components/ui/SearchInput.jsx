import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSearchKeywords } from '../../utils/api-list';

export default function SearchInput() {
  const [input, setInput] = useState('');
  const [prevPathname, setPrevPathname] = useState('');

  const location = useLocation();

  const { data, isSuccess, isLoading } = useSearchKeywords(input.trim());

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (location.pathname.split('/')[2] === prevPathname) return;
    setPrevPathname(location.pathname.split('/')[2]);
    setInput('');
  }, [location.pathname]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" bg-white-400 font-secondary ring-accent-dark-main group relative flex w-[21rem] gap-2 rounded px-2 py-2 ring-2 ring-inset transition-all focus-within:w-full focus-within:rounded-t">
      <span className="text-primary-main flex">
        <ion-icon name="search-sharp" />
      </span>
      <input
        type="text"
        className="paragraph-small text-primary-main placeholder:text-primary-tint-600 w-full font-bold outline-none"
        placeholder="Search..."
        onChange={inputHandler}
        value={input}
      />
      {input.trim() && (
        <ul className="border-accent-dark-main bg-white-400 absolute left-0 top-10 z-10 hidden w-full flex-col rounded-b border-2 group-focus-within:flex">
          {isSuccess && data.recipes.length === 0 && (
            <p className="paragraph-small text-error px-2 py-2 font-bold">
              {data.message}
            </p>
          )}
          {isSuccess &&
            data.recipes.map((recipe, i) => {
              if (i > 10) return;
              return (
                <Link
                  to={`${location.pathname}/${recipe.title}?isEditing=false`}
                  className="border-accent-dark-tint-200/30 hover:bg-primary-tint-700 flex items-center gap-2 border-b-[1px] px-2 py-2 last:border-none"
                  key={recipe._id}
                >
                  <span className="text-primary-main flex">
                    <ion-icon name="search-sharp" />
                  </span>
                  <p className="paragraph-small text-primary-main font-bold">
                    {recipe.title}
                  </p>
                </Link>
              );
            })}
        </ul>
      )}
    </div>
  );
}
