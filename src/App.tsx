import {
  useColorMode,
  Stack,
  Container,
  Heading,
  Box,
  Flex,
  Img,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  // useMediaQuery,
} from "@chakra-ui/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import ContainerCard from "./components/ContainerCard";

// import Mobile from "./components/Mobile";
// import Desktop from "./components/Desktop";

import "./App.css";

import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import bgMobilDark from "./assets/images/bg-mobile-dark.jpg";
import bgMobilLight from "./assets/images/bg-mobile-light.jpg";
import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";

function App() {
  const {colorMode, toggleColorMode} = useColorMode();
  // const [isSmallScreen] = useMediaQuery("(max-width: 414px)");

  return (
    <Box height={"800px"} maxW={"2x1"}>
      <Heading
        backgroundImage={{
          sm: colorMode === "light" ? bgDesktopLight : bgDesktopDark,
          base: colorMode === "light" ? bgMobilLight : bgMobilDark,
        }}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        height={{sm: "300px", base: "200px"}}
      />
      <Stack as={Container}>
        <Flex
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          marginBottom={"24px"}
          marginTop={"-222px"}
        >
          <Box
            color={"white"}
            fontSize={40}
            fontWeight={700}
            letterSpacing={20}
            textTransform={"uppercase"}
          >
            Todo
          </Box>
          <Image src={colorMode === "light" ? iconSun : iconMoon} onClick={toggleColorMode} />
          {/* <Img > /></Img> */}
          {/* Toggle {colorMode === "light" ? "Dark" : "Light"} */}
        </Flex>
        <Flex
          alignItems={"center"}
          backgroundColor={"hsl(235, 24%, 19%)"}
          borderRadius={"md"}
          height={"66px"}
        >
          <Input variant="unstyled" />
        </Flex>
      </Stack>
      {/* {isSmallScreen ? <Mobile /> : <Desktop />} */}

      {/* <!-- Add dynamic number --> items left */}
      {`All \n Active \n Completed \n Clear Completed \n Drag and drop to reorder list`}
      <DndProvider backend={HTML5Backend}>
        <ContainerCard />
      </DndProvider>
    </Box>
  );
}

export default App;
