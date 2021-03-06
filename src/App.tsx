import React, { useContext } from "react";

import StartScreen from "./screens/start-screen/StartScreen";
import GameScreen from "./screens/game-screen/GameScreen";

import { GameContext } from "./context/GameProvider";
import { TGameStatus } from "./context/types/TGameType";
import {
  GAME_OVER,
  IDLE,
  PLAYING,
} from "./assets/constants/gameStatusConstants";
import GameOverScreen from "./screens/game-over-screen/GameOverScreen";
import TopBar from "./screens/game-screen/parts/TopBar";

const App = (): JSX.Element => {
  const {
    gameState: { gameStatus },
  } = useContext(GameContext);

  const renderScreen = (status: TGameStatus): JSX.Element => {
    switch (status) {
      case IDLE:
        return <StartScreen />;
      case PLAYING:
        return <GameScreen />;
      case GAME_OVER:
        return <GameOverScreen />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <>
      <TopBar />
      {renderScreen(gameStatus)}
    </>
  );
};

export default App;
