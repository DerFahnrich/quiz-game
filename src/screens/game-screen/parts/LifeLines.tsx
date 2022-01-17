import React, { useRef } from "react";

interface ILifeLinesProps {
  addTenSeconds: () => void;
  removeTwoOptions: () => void;
}

const LifeLines = ({
  addTenSeconds,
  removeTwoOptions,
}: ILifeLinesProps): JSX.Element => {
  const isAddTenSecondsUsed = useRef(false);
  const isRemoveTwoOptionsUsed = useRef(false);
  const addTenSecondsSpan = useRef<HTMLSpanElement | null>(null);
  const removeTwoOptionsSpan = useRef<HTMLSpanElement | null>(null);

  const handleOnAddTenSecondsClick = (): void => {
    if (!isAddTenSecondsUsed.current) {
      addTenSeconds();
      isAddTenSecondsUsed.current = true;
      addTenSecondsSpan.current?.classList.add("used");
    }
  };

  const handleOnRemoveTwoOptionsClick = (): void => {
    if (!isRemoveTwoOptionsUsed.current) {
      removeTwoOptions();
      isRemoveTwoOptionsUsed.current = true;
      removeTwoOptionsSpan.current?.classList.add("used");
    }
  };

  return (
    <div className="life-lines">
      <span
        aria-hidden
        className="life-line"
        onClick={handleOnAddTenSecondsClick}
        ref={addTenSecondsSpan}
        role="button"
      >
        +10s
      </span>
      <span
        aria-hidden
        className="life-line"
        onClick={handleOnRemoveTwoOptionsClick}
        ref={removeTwoOptionsSpan}
        role="button"
      >
        -2 val
      </span>
    </div>
  );
};

export default LifeLines;
