import { useEffect, useRef, useState } from "react";

const useTimer = (seconds: number, onEnd?: () => void) => {
  const [currentTime, setCurrentTime] = useState(seconds);
  const intervfalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervfalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervfalRef.current!);
          onEnd && onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervfalRef.current!);
  });

  const reset = () => {
    clearInterval(intervfalRef.current!);
    setCurrentTime(seconds);
  };

  return { currentTime, reset };
};

export default useTimer;
