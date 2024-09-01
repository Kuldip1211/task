import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Search Pokémon..."
      className="search-bar"
    />
  );
};

export default SearchBar;
