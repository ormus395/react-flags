import React from "react";

class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      countries: [],
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
        console.log(jsonResponse);
      });
  }

  render() {
    return (
      <div>
        <h1>COUNTRIES CUZ FUCK YOU</h1>
      </div>
    );
  }
}

export default CountryList;
