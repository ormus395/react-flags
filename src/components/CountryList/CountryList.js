import React from "react";
import "./CountryList.css";

import CountryCard from "../CountryCard/CountryCard";

class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      countries: [],
      countryView: [],
      region: "Oceania",
      searchBy: "",
    };

    this.filterByRegion = this.filterByRegion.bind(this);
  }

  componentDidMount() {
    let endpoint = "https://restcountries.eu/rest/v2/all";
    fetch(endpoint)
      .then(
        (response) => {
          return response.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((jsonResponse) => {
        let newState = Object.create(this.state);
        newState.countries = jsonResponse.map((country) => {
          return {
            capital: country.capital,
            name: country.name,
            flag: country.flag,
            region: country.region,
            population: country.population,
          };
        });
        newState.isLoaded = true;
        newState.countryView = this.filterByRegion(
          newState.region,
          newState.countries
        );
        this.setState(newState);
      });
  }

  filterByRegion(region, countries) {
    let filteredCountries = [];
    if (countries.length > 0) {
      if (region !== "Default") {
        filteredCountries = countries.filter((country) => {
          return country.region === region;
        });
      } else {
        filteredCountries = countries;
      }
    } else {
      alert("Waiting for countries to load");
    }

    return filteredCountries;
  }

  render() {
    // need name, population, region and capital, and flag url
    let { isLoaded } = this.state;
    let countryViewList = this.state.countryView.map((country) => {
      return (
        <CountryCard
          info={{
            population: country.population,
            region: country.region,
            capital: country.capital,
          }}
          flag={country.flag}
          name={country.name}
        />
      );
    });
    if (isLoaded) {
    }
    return (
      <section className="country-list">
        {isLoaded ? countryViewList : <h1>Loading</h1>}
      </section>
    );
  }
}

export default CountryList;
