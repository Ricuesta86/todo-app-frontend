import {Heading, useColorMode} from "@chakra-ui/react";
import React from "react";

import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "../assets/images/bg-desktop-light.jpg";

const Desktop = () => {
  const {colorMode} = useColorMode();

  return (
    <Heading
      backgroundImage={colorMode === "light" ? bgDesktopLight : bgDesktopDark}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      height={"300px"}
    />
  );
};

export default Desktop;
