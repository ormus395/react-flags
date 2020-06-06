import React from "react";
import Filter from "./Filter";

function SearchBar(props) {
  return (
    <div className="container">
      <form className="search-bar">
        <span className="search-bar--logo"></span>
        <input
          className="search-bar--input"
          type="text"
          placeholder="Search for a country..."
        />
        <Filter />
      </form>
    </div>
  );
}

export default SearchBar;
