import React, { useCallback, useEffect, useRef, useState } from "react";

interface ISoundButton {
  canPlay: (state: boolean) => void;
}

const SoundButton = ({ canPlay }: ISoundButton) => {
  const params = new URLSearchParams(window.location.search);
  const autplay = params.get("origin") === "start";
  const [allowPlaying, setAllowPlaying] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = useCallback(() => {
    setAllowPlaying((prev) => {
      const next = !prev;
      canPlay(next);

      if (next) {
        audioRef.current?.play().catch(() => {});
      } else {
        audioRef.current?.pause();
      }

      return next;
    });
  }, [canPlay]);

  useEffect(() => {
    audioRef.current = new Audio("background.mp3");
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;
    if (autplay) audioRef.current.play().catch(() => {});
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <div onClick={toggleSound}>
      <button className="bg-blue-400 h-10 w-10 cursor-pointer rounded-xl">
        <img src={allowPlaying ? "sound--on.svg" : "sound--off.svg"} />
      </button>
    </div>
  );
};

export default SoundButton;
