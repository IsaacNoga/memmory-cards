import React, { useMemo, useState } from "react";
import Card, { type ICard } from "./Card";

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
  const firstIds = baseCards.map((card) => ({
    id: crypto.randomUUID(),
    img: card.img,
    state: "DOWN" as states,
    idPair: null,
  }));

  const secondIds = firstIds.map((card) => ({
    ...card,
    id: crypto.randomUUID(),
    idPair: card.id,
  }));

  const originals = firstIds.map((card, i) => ({
    ...card,
    idPair: secondIds[i].id,
  }));

  return [...originals, ...secondIds].sort(() => Math.random() - 0.5);
}

const Board = () => {
  const [deck, setDeck] = useState(generateDeck());

  const handleCardClick = (cardId: string) => {
    setDeck((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (!card || card.state !== "DOWN") return prev;

      const prevPairing = prev.find((c) => c.state === "PAIRING");

      if (prevPairing) {
        const isMatch =
          prevPairing.idPair === card.id || card.idPair === prevPairing.id;

        if (isMatch) {
          return prev.map((c) =>
            c.id === prevPairing.id || c.id === card.id
              ? { ...c, state: "PAIRED" }
              : c,
          );
        }

        setTimeout(() => {
          setDeck((prev) =>
            prev.map((c) =>
              c.id === prevPairing.id || c.id === card.id
                ? { ...c, state: "DOWN" }
                : c.state === "DISABLED"
                  ? { ...c, state: "DOWN" }
                  : c,
            ),
          );
        }, 800);

        return prev.map((c) => {
          if (c.id === card.id) return { ...c, state: "PAIRING" };
          if (c.state === "DOWN") return { ...c, state: "DISABLED" };
          return c;
        });
      }

      return prev.map((c) =>
        c.id === card.id ? { ...c, state: "PAIRING" } : c,
      );
    });
  };

  return (
    <div className="w-full grid grid-cols-4 gap-3 md:gap-20 p-2">
      {deck.map((c) => (
        <Card onClick={() => handleCardClick(c.id ?? "")} key={c?.id} {...c} />
      ))}
    </div>
  );
};

export default Board;
