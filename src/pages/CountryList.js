import SearchForm from "../components/SearchForm";
import CountryCard from "../components/CountryCard";
import FlexWrap from "../layout/FlexWrap";

import CountryService from "../services/countryService";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function CountryList() {
  const [countries, setCountries] = useState({
    unfiltered: [],
    filtered: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  let countryService = new CountryService();

  const handleSearch = (event) => {
    const filteredCountries = countries.unfiltered.filter((country) =>
      country.name.common.includes(event.target.value)
    );
    setCountries({ ...countries, filtered: filteredCountries });
  };

  const handleFilter = async (event) => {
    let region = event.target.value;
    let filteredByRegion;
    if (region === "all") {
      filteredByRegion = await countryService.getAllCountries();
    } else {
      filteredByRegion = await countryService.getCountryByRegion(region);
    }

    setCountries({ ...countries, filtered: filteredByRegion });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      if (!isLoaded) {
        try {
          const allCountries = await countryService.getAllCountries();
          setCountries({ unfiltered: allCountries, filtered: allCountries });
          setIsLoaded(true);
        } catch (e) {
          console.log("Howd we get here?");
          console.log(e);
        }
      }
    };

    fetchCountries();
  }, [isLoaded]);

  return (
    <div>
      <SearchForm handleSearch={handleSearch} handleFilter={handleFilter} />
      <FlexWrap>
        {isLoaded ? (
          countries.filtered.map((c) => (
            <CountryCard key={c.cca2} country={c} />
          ))
        ) : (
          <Center h="100vh" w="100%">
            <Spinner size="xl" />
          </Center>
        )}
      </FlexWrap>
    </div>
  );
}

export default CountryList;
