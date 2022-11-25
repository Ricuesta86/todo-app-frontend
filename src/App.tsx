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

import "./App.css";

import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import bgMobilDark from "./assets/images/bg-mobile-dark.jpg";
import bgMobilLight from "./assets/images/bg-mobile-light.jpg";
import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
import {Card} from "./components/Card";

function App() {
  const [todos, setTodos] = useState<todo[]>([
    {
      id: 1,
      text: "Write a cool JS library",
      completed: false,
    },
    {
      id: 2,
      text: "Make it generic enough",
      completed: false,
    },
    {
      id: 3,
      text: "Write README",
      completed: false,
    },
    {
      id: 4,
      text: "Create some examples",
      completed: false,
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
      completed: false,
    },
    {
      id: 6,
      text: "???",
      completed: false,
    },
    {
      id: 7,
      text: "PROFIT",
      completed: false,
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
            id: Date.now(),
            text,
            completed: false,
          }),
        );
        setText("");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prevCards: todo[]) => {
      const copy = [...prevCards];
      const card = copy[dragIndex];

      // remove origin
      copy.splice(dragIndex, 1);
      // add to target
      copy.splice(hoverIndex, 0, card);

      return copy;
    });
  }, []);
  const handleRemove = (id: todo["id"]) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  const renderCard = useCallback(
    (card: todo, index: number) => {
      return (
        <Card
          key={card.id}
          completed={card.completed}
          handleRemove={handleRemove}
          handleTogget={handleTogget}
          id={card.id}
          index={index}
          moveCard={moveCard}
          text={card.text}
        />
      );
    },
    [moveCard],
  );

  const handleTogget = (id: todo["id"]) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)),
    );
  };

  return (
    <Box fontFamily={`'Josefin Sans', sans-serif`} height={"800px"} maxW={"2x1"}>
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
            letterSpacing={15}
            textTransform={"uppercase"}
          >
            Todo
          </Box>
          <Image src={colorMode === "light" ? iconMoon : iconSun} onClick={toggleColorMode} />
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
        <Stack borderRadius={"md"} height={"448px"}>
          <DndProvider backend={HTML5Backend}>
            <div>{todos.map((todo, i) => renderCard(todo, i))}</div>
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
