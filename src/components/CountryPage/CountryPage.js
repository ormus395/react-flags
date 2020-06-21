import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function CountryPage() {
  console.log("I have to ppop");
  const { alphaCode } = useParams();
  console.log(alphaCode);
  const [country, setCountry] = useState({});
  const [aCode, setACode] = useState(alphaCode);
  let history = useHistory();

  // need to load country by url when loaded
  // need country
  useEffect(() => {
    console.log("am I even calling");
    fetch("https://restcountries.eu/rest/v2/alpha/" + aCode)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("I am being called");
        return setCountry(jsonResponse);
      });
  }, [aCode]);

  function handleClick(bCountry) {
    history.push(`/country/${bCountry}`);
    setACode(bCountry);
  }

  let languages = "";
  let borderCountries = [];

  if (Object.keys(country).length > 0) {
    languages =
      country.languages.length > 0
        ? country.languages
            .map((language) => {
              console.log(language);
              return language.name;
            })
            .join(", ")
        : "";
    borderCountries =
      country.borders.length > 0
        ? country.borders.map((bCountry) => (
            <button key={bCountry} onClick={() => handleClick(bCountry)}>
              {bCountry}
            </button>
          ))
        : "";
  }

  return (
    <>
      {Object.keys(country).length > 0 ? (
        <article>
          <button
            onClick={() => {
              history.goBack();
              console.log(history.location.pathname);
              setACode(aCode);
            }}
          >
            Back
          </button>
          <div>
            <img src={country.flag} alt="" />
          </div>
          <h3>{country.name}</h3>
          <ul>
            <li>Native Name: {country.nativeName}</li>
            <li>Population: {country.population}</li>
            <li>Region: {country.region}</li>
            <li>Sub Region: {country.subregion}</li>
            <li>Capital: {country.capital}</li>
          </ul>
          <ul>
            <li>Top Level Domain: {country.topLevelDomain[0]}</li>
            <li>Currencies: {country.currencies[0].name}</li>
            <li>Languages: {languages}</li>
          </ul>

          <h4>Border Countries</h4>
          <section>{borderCountries}</section>
        </article>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default CountryPage;
