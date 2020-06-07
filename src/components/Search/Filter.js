import React from "react";

function Filter(props) {
  let searchBy = ["Africa", "Asia", "America", "Oceania", "Europe"];
  let options = searchBy.sort().map((option) => {
    return (
      <li value={option} key={option}>
        {option}
      </li>
    );
  });

  return (
    <div className="filter">
      <p className="filter--title">
        Filter by Region{" "}
        <span className="filter--logo">
          <i class="fas fa-chevron-down"></i>
        </span>
      </p>
      <ul className={`${props.hidden} filter--drop-down`}>{options}</ul>
    </div>
  );
}

export default Filter;
