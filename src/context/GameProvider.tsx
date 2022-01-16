import React, { createContext, useEffect, useReducer } from "react";

import gameReducer from "./gameReducer";
import { setQuizQuestions } from "./gameActions";

import quizQuestions from "../screens/game-screen/json/gameQuestions.json";

import IGameContext from "./interfaces/IGameContext";
import IQuizQuestion from "../screens/game-screen/interfaces/IQuizQuestion";

interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

const GameProvider = ({ children }: IGameProviderProps): JSX.Element => {
  const [gameState, gameDispatch] = useReducer(gameReducer, {
    gameStatus: "IDLE",
    statistics: {
      correctAnswers: 0,
      incorrectAnswers: 0,
      unanswered: 0,
    },
  });

  /**
   * The content of this method can be replaced to a proper fetch which
   * fetched data from an external API instead.
   */
  const fetchQuizQuestions = (): void => {
    const questions: IQuizQuestion[] =
      quizQuestions as unknown as IQuizQuestion[];
    gameDispatch(setQuizQuestions(questions));
  };

  const values = { gameState, gameDispatch };

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export default GameProvider;
