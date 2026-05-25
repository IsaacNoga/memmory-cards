import { useEffect, useRef, useState } from "react";

interface IuseTimer {
  seconds: number;
  status: "running" | "paused";
}

const useTimer = (
  seconds: number,
  status: "running" | "paused" = "running",
) => {
  const [currentTime, setCurrentTime] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    clearInterval(intervalRef.current!);
    setCurrentTime(seconds);
  };

  useEffect(() => {
    if (status === "paused") {
      clearInterval(intervalRef.current!);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);
  return { currentTime, reset };
};

export default useTimer;
