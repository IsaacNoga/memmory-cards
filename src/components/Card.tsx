import React, { useState } from "react";
type states = "DOWN" | "PAIRING" | "PAIRED" | "DISABLED";

export interface ICard {
  id: number;
  img: string;
  state: states;
  idPair: number | null;
}

const Card = ({ id, img, state = "DOWN", idPair }: ICard) => {
  return (
    <div className="w-full h-38 md:h-66 grid-cols-1 flex flex-row items-center p-2 bg-blue-400 hover:bg-blue-600 border-6 border-yellow-400 rounded-xl transition-colors ease-in-out cursor-pointer">
      <p className="text-6xl md:text-9xl text-center w-full text-yellow-500">
        ?
      </p>
      {state !== "DOWN" && <img src={img} />}
    </div>
  );
};

export default Card;
