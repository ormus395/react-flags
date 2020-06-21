import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.props.filterBySearchTerm(event.target.value);
  }

  render() {
    return (
      <form className="search-bar white">
        <span className="search-bar--logo">
          <i className="fas fa-search"></i>
        </span>
        <input
          className="search-bar--input"
          type="text"
          placeholder="Search for a country..."
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchBar;
