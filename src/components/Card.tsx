import React, { useState } from "react";
export interface ICard {
  img: string;
  state: "DOWN" | "PAIRING" | "PAIRED" | "DISABLED";
  onClick: () => void;
}

const Card = ({ img, state = "DOWN", onClick }: ICard) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-38 md:h-66 grid-cols-1 flex flex-row items-center p-2 bg-blue-400 hover:bg-blue-600 border-6 border-yellow-400 rounded-xl transition-colors ease-in-out cursor-pointer"
    >
      {state !== "DOWN" ? (
        <img src={img} />
      ) : (
        <p className="text-6xl md:text-9xl text-center w-full text-yellow-500">
          ?
        </p>
      )}
    </div>
  );
};

export default Card;
