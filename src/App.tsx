import {useColorMode, Button, Stack, Box} from "@chakra-ui/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <div className="App">
      Todo
      {/* <!-- Add dynamic number --> items left */}
      {`All \n Active \n Completed \n Clear Completed \n Drag and drop to reorder list`}
      <header>
        <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
      </header>
      <DndProvider backend={HTML5Backend}>
        <Stack>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </DndProvider>
    </div>
  );
}

export default App;
