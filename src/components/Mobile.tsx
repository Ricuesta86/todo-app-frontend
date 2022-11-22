import {Heading, useColorMode} from "@chakra-ui/react";

import bgMobilDark from "../assets/images/bg-mobile-dark.jpg";
import bgMobilLight from "../assets/images/bg-mobile-light.jpg";
const Mobile = () => {
  const {colorMode} = useColorMode();

  return (
    <Heading
      backgroundImage={colorMode === "light" ? bgMobilLight : bgMobilDark}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      height={"200px"}
    />
  );
};

export default Mobile;
