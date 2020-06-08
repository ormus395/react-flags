import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.inputValue);
  }

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
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
