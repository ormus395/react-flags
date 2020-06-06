import React from "react";

function Filter(props) {
  let searchBy = ["Africa", "Asia", "America", "Oceania", "Europe"];
  let options = searchBy.sort().map((option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });

  return (
    <select name="" id="" className="dropdown">
      {options}
    </select>
  );
}

export default Filter;
