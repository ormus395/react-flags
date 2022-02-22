import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

function Header() {
  return (
    <Box boxShadow="base" p="1.5rem 0" mb="1rem" bbor>
      <Container>
        <Flex>
          <Heading size="md">
            <Link to="/">Where In The World?</Link>
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
