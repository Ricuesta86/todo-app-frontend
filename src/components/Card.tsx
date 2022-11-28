import type {Identifier, XYCoord} from "dnd-core";
import type {FC} from "react";

import {Box, Circle, Flex, Image, useColorModeValue} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";

import {todo} from "../types";
import iconCross from "../assets/images/icon-cross.svg";
import iconCheck from "../assets/images/icon-check.svg";

import {ItemTypes} from "./ItemTypes";

const style = {
  borderBottom: "1px solid gray",
  padding: "0 22px",
  // backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  completed: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleTogget: (id: todo["id"]) => void;
  handleRemove: (id: todo["id"]) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  text,
  completed,
  index,
  moveCard,
  handleTogget,
  handleRemove,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop<DragItem, void, {handlerId: Identifier | null}>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return {id, index};
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const bg = useColorModeValue("red.200", "hsl(235, 24%, 19%)");
  const [hoverCard, setHoverCard] = useState<boolean>(false);

  return (
    <Flex
      ref={ref}
      alignItems={"center"}
      bgColor={bg}
      data-handler-id={handlerId}
      direction={"row"}
      height={"66px"}
      justifyContent={"space-between"}
      style={{...style, opacity}}
      width={"100%"}
      onMouseLeave={() => setHoverCard((hoverCard) => false)}
      onMouseOver={() => setHoverCard((hoverCard) => true)}
    >
      <Flex alignItems={"center"} cursor={"pointer"} direction={"row"}>
        {completed ? (
          <Circle
            bgGradient={"linear(to-r, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"}
            size={"25px"}
            onClick={() => handleTogget(id)}
          >
            <Image src={iconCheck} />
          </Circle>
        ) : (
          <Circle bg={"hsl(236, 33%, 92%)"} size={"25px"} onClick={() => handleTogget(id)}>
            <Circle bg={"hsl(0, 0%, 98%)"} size={"23px"} />
          </Circle>
        )}
        <Box
          padding={"0 22px"}
          textDecoration={completed ? "line-through" : ""}
          onClick={() => handleTogget(id)}
        >
          {text}
        </Box>
      </Flex>
      {hoverCard && (
        <Image alt={"Cerrar"} cursor={"pointer"} src={iconCross} onClick={() => handleRemove(id)} />
      )}
    </Flex>
  );
};
