import React, { useCallback, useEffect, useRef, useState } from "react";

interface ISoundButton {
  triggerSonud: boolean;
  canPlay: (state: boolean) => void;
}

const SoundButton = ({ triggerSonud, canPlay }: ISoundButton) => {
  const params = new URLSearchParams(window.location.search);
  const autplay = params.get("origin") === "start";
  const [allowPlaying, setAllowPlaying] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tickingRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = useCallback(() => {
    setAllowPlaying((prev) => {
      const next = !prev;
      canPlay(next);

      if (next) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
        tickingRef.current?.pause;
      }

      return next;
    });
  }, [canPlay]);

  useEffect(() => {
    audioRef.current = new Audio("background.mp3");
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;

    if (autplay) audioRef.current.play();

    tickingRef.current = new Audio("ticking.mp3");
    tickingRef.current.volume = 0.5;
    tickingRef.current.loop = true;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      tickingRef.current?.pause();
      tickingRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (triggerSonud && allowPlaying) {
      tickingRef.current?.play();
      audioRef.current?.pause();
    } else {
      tickingRef?.current?.pause();
      if (tickingRef.current) tickingRef.current.currentTime = 0;
    }
  }, [triggerSonud]);

  return (
    <div onClick={toggleSound}>
      <button className="bg-blue-400 h-10 w-10 cursor-pointer rounded-xl">
        <img src={allowPlaying ? "sound--on.svg" : "sound--off.svg"} />
      </button>
    </div>
  );
};

export default SoundButton;
