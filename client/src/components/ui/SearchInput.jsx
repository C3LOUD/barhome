import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { searchKeywords } from '../../utils/api-list';
import Icon from './Icon';

const SearchInput = () => {
  const [input, setInput] = useState('');
  const [prevPathname, setPrevPathname] = useState('');

  const location = useLocation();

  const { data, isSuccess, isLoading } = searchKeywords(input.trim());

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (location.pathname.split('/')[2] === prevPathname) return;
    setPrevPathname(location.pathname.split('/')[2]);
    setInput('');
  }, [location.pathname]);

  return (
    <div className=" transition-all flex bg-white-400 px-2 py-2 gap-2 w-[21rem] focus-within:w-full focus-within:rounded-t rounded font-secondary ring-2 ring-inset relative ring-accent-dark-main group">
      <Icon name="search-sharp" style="text-primary-main" />
      <input
        type="text"
        className="w-full paragraph-small outline-none placeholder:text-primary-tint-600 text-primary-main font-bold"
        placeholder="Search..."
        onChange={inputHandler}
        value={input}
      />
      {input.trim() && (
        <ul className="absolute z-10 bg-white-400 top-10 left-0 w-full border-2 border-accent-dark-main rounded-b hidden flex-col group-focus-within:flex">
          {isSuccess && data.recipes.length === 0 && (
            <p className="py-2 px-2 paragraph-small text-error font-bold">
              {data.message}
            </p>
          )}
          {isSuccess &&
            data.recipes.map((recipe, i) => {
              if (i > 10) return;
              return (
                <Link
                  to={`${location.pathname}/${recipe.title}?isEditing=false`}
                  className="py-2 px-2 gap-2 border-b-[1px] border-accent-dark-tint-200/30 last:border-none hover:bg-primary-tint-700 flex items-center"
                  key={recipe._id}
                >
                  <Icon name="search-sharp" style="text-primary-main" />
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
};

export default SearchInput;
