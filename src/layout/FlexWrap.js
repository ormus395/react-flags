import { Wrap } from "@chakra-ui/react";

function FlexWrap({ children }) {
  return (
    <Wrap spacing="30px" justify="space-between">
      {children}
    </Wrap>
  );
}

export default FlexWrap;
