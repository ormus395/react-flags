import { Box } from "@chakra-ui/react";

function Container({ children }) {
  return (
    <Box maxW={1080} w="90%" m="auto">
      {children}
    </Box>
  );
}

export default Container;
