// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ input, onChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="Enter a topic"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
