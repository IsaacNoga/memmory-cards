import React, { useEffect, useState } from "react";

interface IModal {
  type?: "SUCCESS" | "ERROR" | null;
  soundStatus: boolean;
  onClose: () => void;
}

const Modal = ({ type, soundStatus, onClose }: IModal) => {
  const playAudio = (type: "SUCCESS" | "ERROR") => {
    const audio = new Audio(
      type === "SUCCESS" ? "/correct.mp3" : "/incorrect.mp3",
    );
    audio.volume = 0.5;
    audio.play();
  };

  useEffect(() => {
    if (!type) return;
    if (soundStatus) playAudio(type);
    const timer = setTimeout(() => {
      onClose();
    }, 700);

    return () => clearTimeout(timer);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/20">
      <div
        className={`h-1/4 w-4/5 ${type === "SUCCESS" ? "bg-green-400" : "bg-red-400"} flex flex-row items-center justify-center md:w-1/2 rounded-xl p-4`}
      >
        <p className="font-semibold text-2xl md:text-6xl">
          {type === "SUCCESS"
            ? "Nice! it's a match"
            : "Sorry, but this is not a match"}
        </p>
      </div>
    </div>
  );
};

export default Modal;
