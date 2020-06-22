import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function CountryPage() {
  let { alphaCode } = useParams();
  let [country, setCountry] = useState({});
  let [aCode, setACode] = useState(alphaCode);
  let [borders, setBorders] = useState([]);
  let [isLoaded, setLoaded] = useState(false);

  let history = useHistory();

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/alpha/" + aCode)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setCountry(jsonResponse);
        setLoaded(true);
      });

    if (isLoaded) {
      let b = [];
      async function fetchCountry() {
        for (let bCountry of country.borders) {
          let response = await fetch(
            "https://restcountries.eu/rest/v2/alpha/" + bCountry
          );
          let jsonResponse = await response.json();
          b.push({
            name: jsonResponse.name,
            alphaCode: jsonResponse.alpha3Code,
          });
        }
      }

      fetchCountry().then(() => {
        setBorders(b);
      });
    }
  }, [aCode, isLoaded]);

  function handleClick(bCountry) {
    setACode(bCountry);
    setLoaded(false);
    history.push(`/country/${bCountry}`);
  }

  let languages = "";
  let borderCountries = [];

  if (Object.keys(country).length > 0) {
    languages =
      country.languages.length > 0
        ? country.languages
            .map((language) => {
              return language.name;
            })
            .join(", ")
        : "";
    borderCountries =
      borders.length > 0
        ? borders.map((bCountry) => {
            return (
              <button
                className="button border--btn"
                key={bCountry.alphaCode}
                onClick={() => handleClick(bCountry.alphaCode)}
              >
                {bCountry.name}
              </button>
            );
          })
        : "";
  }

  return (
    <>
      {Object.keys(country).length > 0 ? (
        <article className="country-page">
          <button className="button country-page__back-btn">
            <Link to="/">Back</Link>
          </button>
          <div className="country-page__flag">
            <img src={country.flag} alt="" />
          </div>
          <h3 className="country-page__title">{country.name}</h3>
          <ul className="country-page__info">
            <li>Native Name: {country.nativeName}</li>
            <li>Population: {country.population}</li>
            <li>Region: {country.region}</li>
            <li>Sub Region: {country.subregion}</li>
            <li>Capital: {country.capital}</li>
          </ul>
          <ul className="country-page__info">
            <li>Top Level Domain: {country.topLevelDomain[0]}</li>
            <li>Currencies: {country.currencies[0].name}</li>
            <li>Languages: {languages}</li>
          </ul>

          <h4 className="country-page__sub">Border Countries</h4>
          <section className="country-page__borders">{borderCountries}</section>
        </article>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default CountryPage;
