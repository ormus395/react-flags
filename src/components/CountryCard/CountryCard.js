import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CountryCard.css";

function CountryCard(props) {
  let attributes = Object.keys(props.info).map((attribute) => {
    return (
      <li className="country-info--item" key={attribute}>
        <span>{attribute}: </span>
        {props.info[attribute]}
      </li>
    );
  });

  return (
    <article className="country-card white">
      <Link to={`/country/${props.alphaCode}`}>
        <section>
          <img src={props.flag} alt="" />
        </section>
        <p className="country-name">{props.name}</p>
        <ul className="country-info">{attributes}</ul>
      </Link>
    </article>
  );
}

export default CountryCard;
