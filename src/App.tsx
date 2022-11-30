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
  Text,
  useColorModeValue,
  Circle,
  // useMediaQuery,
} from "@chakra-ui/react";
import {useCallback, useMemo, useState} from "react";
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

  const [view, setView] = useState<"all" | "active" | "completed">("all");
  const matches = useMemo(() => {
    return todos.filter((todo) =>
      view === "all" ? todo : view === "active" ? !todo.completed : todo.completed,
    );
  }, [todos, view]);
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

  const handleCleanCompleted = () => {
    setTodos((todos) => todos.filter((todo) => todo.completed === false));
  };

  const bg = useColorModeValue("hsl(0, 0%, 100%)", "hsl(235, 24%, 19%)");
  const bgCard = useColorModeValue("hsl(0, 0%, 100%)", "hsl(235, 24%, 19%)");

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
          backgroundColor={bg}
          borderRadius={"md"}
          boxShadow="dark-lg"
          height={"66px"}
        >
          <Circle bg={"hsl(236, 33%, 92%)"} size={"25px"}>
            <Circle bg={"hsl(0, 0%, 98%)"} size={"23px"} />
          </Circle>
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
        <Stack bg={bgCard} borderRadius={"md"} boxShadow="dark-lg" marginTop={"20px"}>
          <DndProvider backend={HTML5Backend}>
            <Box borderTopRadius={"md"} height={"396px"} overflowY={"scroll"}>
              {matches.length > 0 && matches.map((todo, i) => renderCard(todo, i))}
            </Box>
          </DndProvider>
          <Flex
            alignItems={"center"}
            bg={bgCard}
            borderBottomRadius={"md"}
            direction={"row"}
            height={"52px"}
            justifyContent={"space-between"}
            marginTop={"0em !important"}
            padding={"10px 20px"}
          >
            <Box>{todos.length} items left</Box>
            <Flex direction={"row"} gap="10px">
              <Text
                color={view === "all" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("all")}
              >
                All
              </Text>
              <Text
                color={view === "active" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("active")}
              >
                Active
              </Text>
              <Text
                color={view === "completed" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("completed")}
              >
                Completed
              </Text>
            </Flex>
            <Box cursor={"pointer"} onClick={() => handleCleanCompleted()}>
              Clear Completed
            </Box>
          </Flex>
        </Stack>
      </Stack>
      <Stack>
        <Text align={"center"} marginY={"80px"}>
          Drag and drop to reorder list
        </Text>
      </Stack>
      {/* {isSmallScreen ? <Mobile /> : <Desktop />} */}
      {/* <!-- Add dynamic number -->  */}
    </Box>
  );
}

export default App;
