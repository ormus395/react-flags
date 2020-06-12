import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CountryList from "./components/CountryList/CountryList";

class App extends React.Component {
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
    this.handleFilterChange = this.handleFilterChange.bind(this);
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

  handleFilterChange(region) {
    let countries = this.state.countries;

    let filteredCountries = this.filterByRegion(region, countries);

    this.setState((state, props) => {
      let newState = state;
      newState.countryView = filteredCountries;
      newState.region = region;
      return newState;
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

  handleSearchChange(event) {}

  filterBySearchTerm(term) {}

  render() {
    return (
      <section className="App">
        <Header />
        <Search handleFilterChange={this.handleFilterChange} />
        <CountryList
          countries={this.state.countryView}
          loaded={this.state.isLoaded}
        />
      </section>
    );
  }
}

export default App;
