import React from "react";

import startMenuChoices from "./json/startMenuChoices.json";
import IMenuChoice from "./interfaces/IMenuChoice";

const StartPage = (): JSX.Element => {
  const handleOnClick = (menuChoice: IMenuChoice): void => {
    console.log(menuChoice.text);
  };

  return (
    <div className="start-page">
      <div className="start-menu">
        {startMenuChoices.map((menuChoice) => (
          <div
            aria-hidden
            className="menu-choice"
            key={menuChoice.text}
            onClick={() => handleOnClick(menuChoice)}
          >
            <span>{menuChoice.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartPage;
