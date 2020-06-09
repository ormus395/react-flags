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
      tenCountries: [],
    };
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
        let newState = this.state;
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
        this.setState(newState);
      });
  }

  render() {
    // need name, population, region and capital, and flag url
    let { isLoaded } = this.state;
    let countryViewList = this.state.countries.map((country) => {
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
