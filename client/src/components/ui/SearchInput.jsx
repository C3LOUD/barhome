import React from 'react';

import Icon from './Icon';

const SearchInput = () => {
  return (
    <div className="flex bg-white-400 px-2 py-2 gap-2 rounded w-[21rem] font-secondary border-2">
      <Icon name="search-sharp" color="text-primary-main" />
      <input
        type="text"
        className="w-full paragraph-small focus:outline-none placeholder:text-primary-tint-600 text-primary-main"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
