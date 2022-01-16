import { Dispatch, SetStateAction, useState } from "react";

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

function useBoolean(defaultValue: boolean): ReturnType {
  const [value, setValue] = useState(defaultValue);

  const setTrue = (): void => setValue(true);
  const setFalse = (): void => setValue(false);
  const toggle = (): void => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
}

export default useBoolean;
