import React, { useState } from "react";
export interface ICard {
  img: string;
  state: "DOWN" | "PAIRING" | "PAIRED" | "DISABLED";
  onClick: () => void;
}

const Card = ({ img, state = "DOWN", onClick }: ICard) => {
  const flipped = state === "PAIRED" || state === "PAIRING";

  return (
    <button
      onClick={() => (state !== "DOWN" ? null : onClick())}
      className="w-full h-38 md:h-66 perspective cursor-pointer"
    >
      <div
        className={`
          relative w-full h-full duration-500 transition-transform preserve-3d
          ${flipped ? "rotate-y-180" : ""}
        `}
      >
        <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-blue-400 hover:bg-blue-600 border-6 md:border-12 border-yellow-400 rounded-xl">
          <p className="text-6xl md:text-9xl text-yellow-500">?</p>
        </div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden flex items-center justify-center bg-blue-400 border-6 md:border-12 border-yellow-400 rounded-xl">
          <img src={img} className="w-16 md:w-24" />
        </div>
      </div>
    </button>
  );
};

export default Card;
