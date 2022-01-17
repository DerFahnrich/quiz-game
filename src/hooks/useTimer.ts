import { useRef } from "react";

interface IReturnType {
  startTimer: () => void;
  endTimerAndGetTime: () => number;
}

const useTimer = (): IReturnType => {
  const start = useRef<number>(0);

  const startTimer = (): void => {
    start.current = Date.now();
  };

  const endTimerAndGetTime = (): number => {
    const end = Date.now();
    const totaltTime = (end - start.current) / 1000;
    start.current = 0;
    return totaltTime;
  };

  return { startTimer, endTimerAndGetTime };
};

export default useTimer;
