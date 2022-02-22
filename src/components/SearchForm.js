import {
  Box,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../utils";

function SearchForm({ handleSearch, handleFilter }) {
  return (
    <Box m="2.5rem 0">
      <Flex justify="space-between" gap="15px" wrap="wrap">
        <InputGroup maxW={300} size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          />
          <Input
            onChange={(e) => debounce(() => handleSearch(e))}
            placeholder="Search for a country..."
          />
        </InputGroup>
        <Filter handleFilter={handleFilter} />
      </Flex>
    </Box>
  );
}

export default SearchForm;
