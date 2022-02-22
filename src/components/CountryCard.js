import { Link } from "react-router-dom";
import { Box, Image, List, Text } from "@chakra-ui/react";
import { formatNameForLink } from "../utils";

function CountryCard({ country }) {
  return (
    <Box
      bg="white"
      maxW="300px"
      maxH="450px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <Link
        key={country.cca2}
        style={{ textDecoration: "none" }}
        to={`/country/${formatNameForLink(country.name.common)}`}
      >
        <Image src={country.flags.svg} alt="Country Flag" />

        <Box p={3}>
          <Box mt="1" fontWeight="bold" as="h3" lineHeight="tight" isTruncated>
            {country.name.common}
          </Box>

          <Box mt="10px">
            <List spacing={2}>
              <Box>
                <Text display="inline" fontWeight={"semibold"}>
                  Population:
                </Text>{" "}
                <Text display="inline">{country.population}</Text>
              </Box>
              <Box>
                <Text display="inline" fontWeight={"semibold"}>
                  Region:
                </Text>{" "}
                <Text display="inline">{country.region}</Text>
              </Box>
              <Box>
                <Text display="inline" fontWeight={"semibold"}>
                  Capital:
                </Text>{" "}
                <Text display="inline">{country.capital}</Text>
              </Box>
            </List>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default CountryCard;
