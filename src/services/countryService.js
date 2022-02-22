class CountryService {
  constructor() {
    this.uri = "https://restcountries.com/v3.1/";
  }

  async getAllCountries() {
    const resp = await fetch(this.uri + "all");
    const countries = await resp.json();
    return countries;
  }

  async getCountryByName(name) {
    const resp = await fetch(`${this.uri}/name/${name}`);
    const country = await resp.json();

    return country;
  }

  async getCountryByAlphaCode(alphaCode) {
    const resp = await fetch(`${this.uri}/alpha/${alphaCode}`);
    const country = await resp.json();

    return country;
  }

  async getCountryByRegion(region) {
    const resp = await fetch(`${this.uri}/region/${region}`);
    const countries = resp.json();

    return countries;
  }
}

export default CountryService;
