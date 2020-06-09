import React from "react";
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
      <section>
        <img src={props.flag} alt="" />
      </section>
      <p className="country-name">{props.name}</p>
      <ul className="country-info">{attributes}</ul>
    </article>
  );
}

export default CountryCard;
