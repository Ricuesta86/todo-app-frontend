import type {FC} from "react";

import {useCallback, useState} from "react";

import {Card} from "./Card";

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const ContainerCard: FC = () => {
  {
    const [cards, setCards] = useState([
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

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) => {
        const copy = [...prevCards];
        const card = copy[dragIndex];

        // remove origin
        copy.splice(dragIndex, 1);
        // add to target
        copy.splice(hoverIndex, 0, card);

        return copy;
      });
    }, []);

    const renderCard = useCallback((card: {id: number; text: string}, index: number) => {
      return <Card key={card.id} id={card.id} index={index} moveCard={moveCard} text={card.text} />;
    }, []);

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};

export default ContainerCard;
