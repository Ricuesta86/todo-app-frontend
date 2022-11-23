import {
  useColorMode,
  Button,
  Stack,
  Container,
  Heading,
  Box,
  Flex,
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
        <Flex alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
          <Box fontSize={40} fontWeight={700} letterSpacing={20} textTransform={"uppercase"}>
            Todo
          </Box>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
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
