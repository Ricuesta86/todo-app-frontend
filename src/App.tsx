import type {todo} from "./types";

import {
  useColorMode,
  Stack,
  Heading,
  Box,
  Flex,
  Image,
  Input,
  Text,
  useColorModeValue,
  Circle,
  useMediaQuery,
  Container,
  // useMediaQuery,
} from "@chakra-ui/react";
import {useCallback, useEffect, useMemo, useState} from "react";
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
import api from "./api/api";

function App() {
  const [todos, setTodos] = useState<todo[]>(api.todos.list);
  const [text, setText] = useState<string>("");
  const {colorMode, toggleColorMode} = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 414px)");

  const [view, setView] = useState<"all" | "active" | "completed">("all");
  const matches = useMemo(() => {
    return todos.filter((todo) =>
      view === "all" ? todo : view === "active" ? !todo.completed : todo.completed,
    );
  }, [todos, view]);

  useEffect(() => {
    api.todos.set(todos);
  }, [todos]);

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
  const textColor = useColorModeValue("hsl(236, 9%, 61%)", "hsl(236, 9%, 61%)");
  const hoverColor = useColorModeValue("hsl(235, 19%, 35%)", "hsl(233, 11%, 84%)");

  return (
    <Box height={isMobile ? "730px" : "800px"} maxW={"2x1"}>
      <Heading
        backgroundImage={{
          base: colorMode === "light" ? bgMobilLight : bgMobilDark,
          sm: colorMode === "light" ? bgDesktopLight : bgDesktopDark,
        }}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        height={{base: "200px", sm: "300px"}}
      />
      <Stack as={isMobile ? Stack : Container} marginX={isMobile ? "25px !important" : ""}>
        <Flex
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          marginBottom={"24px"}
          marginTop={{base: "-167px", sm: "-222px"}}
        >
          <Box
            color={"white"}
            fontSize={{base: "26px", sm: 40}}
            fontWeight={700}
            letterSpacing={{base: "10px", sm: 15}}
            marginTop={"10px"}
            textTransform={"uppercase"}
          >
            Todo
          </Box>
          <Image
            alt={colorMode === "light" ? "Icon Moon" : "Icon Sun"}
            height={{base: "22px", sm: "28px"}}
            src={colorMode === "light" ? iconMoon : iconSun}
            width={{base: "22px", sm: "28px"}}
            onClick={toggleColorMode}
          />
          {/* <Img > /></Img> */}
          {/* Toggle {colorMode === "light" ? "Dark" : "Light"} */}
        </Flex>
        <Flex
          alignItems={"center"}
          backgroundColor={bg}
          borderRadius={"md"}
          boxShadow="dark-lg"
          height={["48px", "66px"]}
          marginBottom={{base: "7px !important", sm: "16px !important"}}
        >
          <Circle bg={"hsl(236, 33%, 92%)"} marginX={"20px"} size={{base: "22px", sm: "25px"}}>
            <Circle bg={bg} size={{base: "20px", sm: "23px"}} />
          </Circle>
          <Input
            _focus={{}}
            _placeholder={{fontSize: {base: "12px", sm: "18px"}}}
            placeholder="Create a new todo..."
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
            <Box
              borderTopRadius={"md"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                // "&::-webkit-scrollbar-track": {
                //   width: "6px",
                // },
                // "&::-webkit-scrollbar-thumb": {
                //   background: "scrollbarColor",
                //   borderRadius: "24px",
                // },
              }}
              height={["312px", "396px"]}
              overflowY={"auto"}
            >
              {matches.length > 0 && matches.map((todo, i) => renderCard(todo, i))}
            </Box>
          </DndProvider>
          <Flex
            alignItems={"center"}
            bg={bgCard}
            borderBottomRadius={"md"}
            color={textColor}
            direction={"row"}
            height={"52px"}
            justifyContent={"space-between"}
            marginTop={"0em !important"}
            padding={"10px 20px"}
          >
            <Box>{todos.length} items left</Box>
            <Flex
              direction={"row"}
              display={{base: "none", sm: "none", md: "flex"}}
              fontWeight={700}
              gap="10px"
            >
              <Text
                _hover={{color: hoverColor}}
                color={view === "all" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("all")}
              >
                All
              </Text>
              <Text
                _hover={{color: hoverColor}}
                color={view === "active" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("active")}
              >
                Active
              </Text>
              <Text
                _hover={{color: hoverColor}}
                color={view === "completed" ? "hsl(220, 98%, 61%)" : ""}
                cursor={"pointer"}
                onClick={() => setView("completed")}
              >
                Completed
              </Text>
            </Flex>
            <Box
              _hover={{color: hoverColor}}
              cursor={"pointer"}
              fontWeight={400}
              onClick={() => handleCleanCompleted()}
            >
              Clear Completed
            </Box>
          </Flex>
        </Stack>
        <Flex
          alignItems={"center"}
          bg={bg}
          borderRadius={"md"}
          boxShadow="dark-lg"
          direction={"row"}
          display={{base: "flex", md: "none"}}
          fontWeight={700}
          gap="10px"
          height={"52px"}
          justifyContent={"center"}
          marginTop={"25px !important"}
        >
          <Text
            _hover={{color: hoverColor}}
            color={view === "all" ? "hsl(220, 98%, 61%)" : ""}
            cursor={"pointer"}
            onClick={() => setView("all")}
          >
            All
          </Text>
          <Text
            _hover={{color: hoverColor}}
            color={view === "active" ? "hsl(220, 98%, 61%)" : ""}
            cursor={"pointer"}
            onClick={() => setView("active")}
          >
            Active
          </Text>
          <Text
            _hover={{color: hoverColor}}
            color={view === "completed" ? "hsl(220, 98%, 61%)" : ""}
            cursor={"pointer"}
            onClick={() => setView("completed")}
          >
            Completed
          </Text>
        </Flex>
      </Stack>
      <Stack>
        <Text align={"center"} marginY={isMobile ? "42px" : "60px"}>
          Drag and drop to reorder list
        </Text>
      </Stack>
      {/* {isSmallScreen ? <Mobile /> : <Desktop />} */}
      {/* <!-- Add dynamic number -->  */}
    </Box>
  );
}

export default App;
