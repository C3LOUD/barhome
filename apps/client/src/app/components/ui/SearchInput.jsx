import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSearchKeywords } from '../../utils/api-list';
import Icon from './Icon';

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
    <div className=" group relative flex w-[21rem] gap-2 rounded bg-white-400 px-2 py-2 font-secondary ring-2 ring-inset ring-accent-dark-main transition-all focus-within:w-full focus-within:rounded-t">
      <Icon name="search-sharp" className="text-primary-main" />
      <input
        type="text"
        className="paragraph-small w-full font-bold text-primary-main outline-none placeholder:text-primary-tint-600"
        placeholder="Search..."
        onChange={inputHandler}
        value={input}
      />
      {input.trim() && (
        <ul className="absolute left-0 top-10 z-10 hidden w-full flex-col rounded-b border-2 border-accent-dark-main bg-white-400 group-focus-within:flex">
          {isSuccess && data.recipes.length === 0 && (
            <p className="paragraph-small px-2 py-2 font-bold text-error">
              {data.message}
            </p>
          )}
          {isSuccess &&
            data.recipes.map((recipe, i) => {
              if (i > 10) return;
              return (
                <Link
                  to={`${location.pathname}/${recipe.title}?isEditing=false`}
                  className="flex items-center gap-2 border-b-[1px] border-accent-dark-tint-200/30 px-2 py-2 last:border-none hover:bg-primary-tint-700"
                  key={recipe._id}
                >
                  <Icon name="search-sharp" className="text-primary-main" />
                  <p className="paragraph-small font-bold text-primary-main">
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
