import {
  useColorMode,
  Button,
  Stack,
  Container,
  Heading,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {ContainerCard} from "./components/ContainerCard";
import "./App.css";
import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

function App() {
  const {colorMode, toggleColorMode} = useColorMode();
  const [isSmallScreen] = useMediaQuery("(max-width: 414px)");

  return (
    <Box height={"800px"} maxW={"2x1"}>
      {isSmallScreen ? <Mobile /> : <Desktop />}
      <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
      Todo
      {/* <!-- Add dynamic number --> items left */}
      {`All \n Active \n Completed \n Clear Completed \n Drag and drop to reorder list`}
      <DndProvider backend={HTML5Backend}>
        <ContainerCard />
      </DndProvider>
    </Box>
  );
}

export default App;
