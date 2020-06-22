import React from "react";
import "./CountryList.css";

import CountryCard from "../CountryCard/CountryCard";

function CountryList(props) {
  // need name, population, region and capital, and flag url
  let isLoaded = props.loaded;
  let countryViewList = props.countries.map((country) => {
    return (
      <CountryCard
        key={country.alpha3Code}
        info={{
          population: country.population,
          region: country.region,
          capital: country.capital,
        }}
        flag={country.flag}
        name={country.name}
        alphaCode={country.alpha3Code}
      />
    );
  });
  return (
    <section className="country-list">
      {isLoaded ? countryViewList : <h1>Loading</h1>}
    </section>
  );
}

export default CountryList;
