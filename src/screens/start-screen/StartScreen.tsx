import React, { useContext, useState } from "react";

import startMenuChoices from "./json/startMenuChoices.json";
import IMenuChoice from "./interfaces/IMenuChoice";

import { GameContext } from "../../context/GameProvider";
import { updateGameStatus } from "../../context/gameActions";

import { START_GAME } from "../../assets/constants/startMenuConstants";
import { PLAYING } from "../../assets/constants/gameStatusConstants";

const StartScreen = (): JSX.Element => {
  const [menuChoices, setMenuChoices] =
    useState<IMenuChoice[]>(startMenuChoices);

  const { gameDispatch } = useContext(GameContext);

  const handleOnClick = (menuChoice: IMenuChoice): void => {
    switch (menuChoice.purpose) {
      case START_GAME:
        return gameDispatch(updateGameStatus(PLAYING));
      default:
        return console.log(menuChoice.text);
    }
  };

  return (
    <div className="start-page">
      <div className="start-menu">
        {menuChoices.map((menuChoice) => (
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

export default StartScreen;
