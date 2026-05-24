import React, { useMemo, useState } from "react";
import Card from "./Card";

export interface ICards {
  id: string | null;
  img: string;
  state: "DOWN" | "PAIRING" | "PAIRED" | "DISABLED";
  idPair: string | null;
}

type states = "DOWN" | "PAIRING" | "PAIRED" | "DISABLED";

const baseCards: ICards[] = [
  {
    id: null,
    img: "star.svg",
    state: "DOWN",
    idPair: null,
  },
  {
    id: null,
    img: "moon.svg",
    state: "DOWN",
    idPair: null,
  },
  {
    id: null,
    img: "sun.svg",
    state: "DOWN",
    idPair: null,
  },
  {
    id: null,
    img: "comet.svg",
    state: "DOWN",
    idPair: null,
  },
];

function generateDeck(): ICards[] {
  return [...baseCards, ...baseCards]
    .map((card) => ({
      id: crypto.randomUUID(),
      idPair: card.id,
      img: card.img,
      state: "DOWN" as states,
    }))
    .sort(() => Math.random() - 0.5);
}

const Board = () => {
  const [deck, setDeck] = useState(generateDeck());

  const parigin = (id: string) => {
    setDeck((prev) =>
      prev.map((c) => (c.id === id ? { ...c, state: "PAIRING" } : c)),
    );
  };

  return (
    <div className="w-full grid grid-cols-4 gap-3 md:gap-20 p-2">
      {deck.map((c) => (
        <Card onClick={() => parigin(c?.id ?? "")} key={c?.id} {...c} />
      ))}
    </div>
  );
};

export default Board;
