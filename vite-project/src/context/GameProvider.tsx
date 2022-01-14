import React, { createContext, useReducer } from "react";
import gameReducer from "./gameReducer";

import IGameContext from "./interfaces/IGameContext";

interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

const GameProvider = ({ children }: IGameProviderProps): JSX.Element => {
  const [gameState, gameDispatch] = useReducer(gameReducer, {
    gameStatus: "IDLE",
  });

  const values = { gameState, gameDispatch };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export default GameProvider;
