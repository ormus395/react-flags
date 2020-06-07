import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="search-bar">
        <span className="search-bar--logo">
          <i class="fas fa-search"></i>
        </span>
        <input
          className="search-bar--input"
          type="text"
          placeholder="Search for a country..."
        />
      </form>
    );
  }
}

export default SearchBar;
