import React from "react";
import "./Search.css";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };

    this.toggle = this.toggle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  toggle() {
    let { hidden } = this.state;

    if (hidden) {
      this.setState({ hidden: false });
    } else {
      this.setState({ hidden: true });
    }
  }

  handleToggle() {
    this.toggle();
  }

  render() {
    return (
      <div className="search">
        <SearchBar />
        <Filter />
      </div>
    );
  }
}

export default Search;
