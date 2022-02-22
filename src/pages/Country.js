import {
  Box,
  Image,
  Button,
  Heading,
  Flex,
  List,
  ListItem,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountryService from "../services/countryService";
import { formatNameForLink, slugToName } from "../utils";

function Country() {
  const navigate = useNavigate();
  const params = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const countryService = new CountryService();

  const borderCountryLinks = () => {
    if (borderCountries.length > 0) {
      console.log(borderCountries);
      return borderCountries.map((c) => {
        let name = c[0].name.common;
        return (
          <Button
            m={1}
            onClick={() => {
              navigate(`/country/${formatNameForLink(name)}`);
              setIsLoaded(false);
            }}
          >
            {name}
          </Button>
        );
      });
    } else {
      return <Spinner />;
    }
  };

  useEffect(() => {
    console.log("running effect hook");
    if (!isLoaded) {
      countryService
        .getCountryByName(slugToName(params.countryName))
        .then((country) => {
          const borderPromise = [];
          setCountry(country[0]);
          setIsLoaded(true);
          if (country[0].borders) {
            for (let borders of country[0].borders) {
              let p = countryService.getCountryByAlphaCode(borders);
              borderPromise.push(p);
            }

            return Promise.all(borderPromise);
          }
        })
        .then((pAll) => {
          if (pAll) {
            if (pAll.length > 0) {
              return setBorderCountries(pAll);
            }
          }
          return setBorderCountries(null);
        });
    }
  }, [isLoaded]);

  console.log(country);
  return (
    <div>
      <Box py={5}>
        <Button>
          <Link to={`/`}>{"<"} Go Back</Link>
        </Button>
      </Box>

      {isLoaded ? (
        <Flex align="center" justify="space-between" wrap="wrap">
          <Box maxW={550}>
            <Image src={country.flags.svg} alt="Country Flag" />
          </Box>
          <Box>
            <Heading>{country.name.common}</Heading>
            <Flex justify="space-between" my={6} wrap="wrap">
              <List spacing={2}>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Native Name:</span>{" "}
                  {Object.keys(country.name.nativeName).map((nName) => {
                    return `${country.name.nativeName[nName].common}, `;
                  })}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Population:</span>{" "}
                  {country.population}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Region:</span>{" "}
                  {country.region}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Sub Region:</span>{" "}
                  {country.subregion}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Capital:</span>{" "}
                  {country.capital}
                </ListItem>
              </List>
              <List spacing={2}>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Top Level Doman:</span>{" "}
                  {country.tld[0]}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Currencies:</span>{" "}
                  {Object.keys(country.currencies).map((k) => {
                    return `${country.currencies[k].name} `;
                  })}
                </ListItem>
                <ListItem>
                  <span style={{ fontWeight: "bold" }}>Languages:</span>{" "}
                  {Object.keys(country.languages).map((k) => {
                    return `${country.languages[k]} `;
                  })}
                </ListItem>
              </List>
            </Flex>
            <Flex maxW={365} wrap="wrap">
              {borderCountries ? (
                <Text>
                  <span style={{ fontWeight: "bold" }}>Border Countries: </span>
                  {borderCountryLinks()}
                </Text>
              ) : null}
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Center h="100vh" w="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </div>
  );
}

export default Country;
