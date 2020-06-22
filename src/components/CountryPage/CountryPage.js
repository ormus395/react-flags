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

  // need to load country by url when loaded
  // need country
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/alpha/" + aCode)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.borders.length > 0) {
          let b = [];
          async function fetchBorders() {
            console.log("Fetching border countrie");
            for (let border of jsonResponse.borders) {
              let response = await fetch(
                "https://restcountries.eu/rest/v2/alpha/" + border
              );
              let jsonResponse = await response.json();
              console.log(jsonResponse);
              b.push({
                name: jsonResponse.name,
                alphaCode: jsonResponse.alpha3Code,
              });
            }
          }

          fetchBorders();
          console.log(b);
          setBorders(b);
          setCountry(jsonResponse);
        } else {
          setCountry(jsonResponse);
        }
      });
  }, [aCode]);

  function handleClick(bCountry) {
    setACode(bCountry);
    history.push(`/country/${bCountry}`);
  }

  let languages = "";
  let borderCountries = [];

  if (Object.keys(country).length > 0) {
    console.log("Render");
    console.log(borders);
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
      borders.length > 0
        ? borders.map((bCountry) => {
            console.log("fuck this");
            return (
              <button
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
        <article>
          <button>
            <Link to="/">Back</Link>
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
