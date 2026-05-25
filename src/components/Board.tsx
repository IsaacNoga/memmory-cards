import React, { useEffect, useMemo, useState } from "react";
import Card, { type ICard } from "./Card";
import Modal from "./Modal";
import SoundButton from "./SoundButton";
import useTimer from "../utils/hooks/useTimer";

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
  const [timerStatus, setTimerStatus] = useState<"running" | "paused">(
    "running",
  );
  const { currentTime } = useTimer(30, timerStatus);
  const [deck, setDeck] = useState(generateDeck());
  const [gameStatus, setGameStatus] = useState<
    "PLAYING" | "SUCCESS" | "LOSE" | "ERROR" | null
  >("PLAYING");
  const [allowPlaying, setAllowPlaying] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<"SUCCESS" | "ERROR" | null>(null);

  const handleCardClick = (cardId: string) => {
    setDeck((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (!card || card.state !== "DOWN") return prev;

      const prevPairing = prev.find((c) => c.state === "PAIRING");

      if (prevPairing) {
        const isMatch =
          prevPairing.idPair === card.id || card.idPair === prevPairing.id;

        if (isMatch) {
          setShowModal("SUCCESS");
          return prev.map((c) =>
            c.id === prevPairing.id || c.id === card.id
              ? { ...c, state: "PAIRED" }
              : c,
          );
        } else {
          setShowModal("ERROR");
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

  useEffect(() => {
    const allPaired = deck.every((c) => c.state === "PAIRED");
    if (allPaired && currentTime > 0) {
      setGameStatus("SUCCESS");
      setTimerStatus("paused");
    }
    if (!allPaired && currentTime === 0) {
      setTimerStatus("paused");
      setGameStatus("LOSE");
    }
  }, [deck, currentTime]);

  useEffect(() => {
    if (gameStatus === "SUCCESS" || gameStatus === "LOSE") {
      const timer = setTimeout(() => {
        const param = gameStatus === "SUCCESS" ? "success" : "lose";
        window.location.href = `/finish?status=${param}`;
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="w-full justify-between flex flex-row">
        <div className="flex flex-col">
          <p className="text-white font-semibold text-2xl">Game Started!</p>
          <p className="text-white font-semibold text-4xl">
            Time Left: {currentTime}
          </p>
        </div>
        <SoundButton
          canPlay={setAllowPlaying}
          triggerSonud={currentTime <= 10}
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-1 sm:gap-3 md:gap-10 lg:gap-20 sm:p-2">
        {deck.map((c) => (
          <Card
            onClick={() => handleCardClick(c.id ?? "")}
            key={c?.id}
            {...c}
          />
        ))}
      </div>
      <Modal
        type={showModal}
        onClose={() => setShowModal(null)}
        soundStatus={allowPlaying}
      />
    </div>
  );
};

export default Board;
