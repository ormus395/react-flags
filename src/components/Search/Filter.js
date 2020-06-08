import React from "react";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      className: "hidden",
      filterOptions: [
        "Africa",
        "Asia",
        "America",
        "Oceania",
        "Europe",
        "Default",
      ],
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle(event) {
    let { hidden } = this.state;

    if (hidden) {
      this.setState({ hidden: false, className: "" });
    } else {
      this.setState({ hidden: true, className: "hidden" });
    }
  }

  handleClick(event) {
    let sortBy = event.target.innerHTML;
    this.handleSortChange(sortBy);
  }

  handleSortChange(sortBy) {
    this.props.filterBy(sortBy);
  }

  render() {
    let options = this.state.filterOptions.sort().map((option) => {
      return (
        <li value={option} key={option}>
          {option}
        </li>
      );
    });

    return (
      <div className="filter">
        <p className="filter--title" onClick={this.toggle}>
          Filter by Region{" "}
          <span className="filter--logo">
            <i className="fas fa-chevron-down"></i>
          </span>
        </p>
        <ul
          className={`${this.state.className} filter--drop-down`}
          onClick={this.handleClick}
        >
          {options}
        </ul>
      </div>
    );
  }
}

export default Filter;
