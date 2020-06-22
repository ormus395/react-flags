import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CountryList from "./components/CountryList/CountryList";
import CountryPage from "./components/CountryPage/CountryPage";

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
    this.filterBySearchTerm = this.filterBySearchTerm.bind(this);
  }

  componentDidMount() {
    console.log("Fetching all countries");
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
          return country;
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

  filterBySearchTerm(term) {
    this.setState((state, props) => {
      let newState = state;

      newState.countryView = newState.countries.filter((country) => {
        if (state.region !== "Default") {
          if (
            country.name.includes(term) &&
            country.region === newState.region
          ) {
            return true;
          }
        } else {
          if (country.name.includes(term)) {
            return true;
          }
        }

        return false;
      });

      return newState;
    });
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/country/:alphaCode">
            <CountryPage />
          </Route>
          <Route path="/">
            <section className="App">
              <Search
                handleFilterChange={this.handleFilterChange}
                filterBySearchTerm={this.filterBySearchTerm}
              />
              <CountryList
                countries={this.state.countryView}
                loaded={this.state.isLoaded}
              />
            </section>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
