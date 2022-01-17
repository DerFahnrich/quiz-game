import { Dispatch, SetStateAction, useState } from "react";

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: (newCount?: number) => void;
  setCount: Dispatch<SetStateAction<number>>;
}

function useCounter(initialValue?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0);

  const increment = (): void => setCount((x) => x + 1);
  const decrement = (): void => setCount((x) => x - 1);
  const reset = (newCount?: number): void =>
    setCount(newCount || initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}

export default useCounter;
