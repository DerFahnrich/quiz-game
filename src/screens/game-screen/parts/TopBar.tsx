import React, { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";
import { updateGameStatus } from "../../../context/gameActions";
import {
  GAME_OVER,
  IDLE,
  PLAYING,
} from "../../../assets/constants/gameStatusConstants";

const TopBar = (): JSX.Element => {
  const {
    gameState: { gameStatus },
    gameDispatch,
  } = useContext(GameContext);

  const handleOnClick = (): void => {
    if (gameStatus === PLAYING) {
      gameDispatch(updateGameStatus(GAME_OVER));
    }

    if (gameStatus === GAME_OVER) {
      gameDispatch(updateGameStatus(IDLE));
    }
  };

  return (
    <div className="top-bar">
      {gameStatus !== IDLE && (
        <span
          aria-hidden
          className="cancel material-icons"
          onClick={handleOnClick}
          role="button"
        >
          {gameStatus === PLAYING ? "cancel" : "door_back"}
        </span>
      )}
      <span className="logo">QUIZ GAME</span>
    </div>
  );
};

export default TopBar;
