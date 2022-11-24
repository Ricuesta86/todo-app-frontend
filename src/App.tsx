import type {todo} from "./types";

import {
  useColorMode,
  Stack,
  Container,
  Heading,
  Box,
  Flex,
  Image,
  Input,
  // useMediaQuery,
} from "@chakra-ui/react";
import {useCallback, useState} from "react";
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
  const [todos, setTodos] = useState<todo[]>([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
  ]);
  const [text, setText] = useState<string>("");
  const {colorMode, toggleColorMode} = useColorMode();
  // const [isSmallScreen] = useMediaQuery("(max-width: 414px)");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (text !== "") {
        setTodos((todos) =>
          todos.concat({
            id: 1,
            text,
            index: 1,
          }),
        );
        setText("");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prevTodos: todo[]) => {
      const copy = [...prevTodos];
      const todo = copy[dragIndex];

      // remove origin
      copy.splice(dragIndex, 1);
      // add to target
      copy.splice(hoverIndex, 0, todo);

      return copy;
    });
  }, []);

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
          <Input
            value={text}
            variant="unstyled"
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event);
            }}
          />
        </Flex>
        <Stack height={"448px"}>
          <DndProvider backend={HTML5Backend}>
            <ContainerCard moveTodo={moveTodo} todos={todos} />
          </DndProvider>
          <Stack>
            <Box>
              {" "}
              5 items left
              {`All \n Active \n Completed \n Clear Completed \n Drag and drop to reorder list`}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {/* {isSmallScreen ? <Mobile /> : <Desktop />} */}
      {/* <!-- Add dynamic number -->  */}
    </Box>
  );
}

export default App;
