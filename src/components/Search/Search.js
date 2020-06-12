import React from "react";
import "./Search.css";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: "default",
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(option) {
    this.setState({ filterBy: option });
  }

  render() {
    return (
      <div className="search">
        <SearchBar />
        <Filter
          filterBy={this.handleFilter}
          handleFilterChange={this.props.handleFilterChange}
        />
      </div>
    );
  }
}

export default Search;
