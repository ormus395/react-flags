import { Select } from "@chakra-ui/react";

function Filter({ handleFilter }) {
  return (
    <Select
      onChange={(e) => handleFilter(e)}
      width="50%"
      maxW="200px"
      placeholder="Filter by Region"
    >
      <option value="all">All</option>
      <option value="africa">Africa</option>
      <option value="americas">Americas</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </Select>
  );
}

export default Filter;
