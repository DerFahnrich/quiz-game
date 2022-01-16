import React, { useCallback, useContext } from "react";

import TopBar from "./parts/TopBar";
import GameIntro from "./parts/GameIntro";
import Game from "./parts/Game";

import { GameContext } from "../../context/GameProvider";

import useBoolean from "../../hooks/useBoolean";

import IQuizQuestion from "./interfaces/IQuizQuestion";

const GameScreen = (): JSX.Element => {
  const { value: playGame, toggle } = useBoolean(false);

  const {
    gameState: { quizQuestions },
  } = useContext(GameContext);

  const pick10RandomQuestions = useCallback((): IQuizQuestion[] => {
    if (quizQuestions) {
      const quizQuestionsCopy = [...quizQuestions];
      const tenRandomQuestions: IQuizQuestion[] = [];

      for (let i = 0; i < 10; i += 1) {
        const max = quizQuestionsCopy.length;
        const randomIndex = Math.floor(Math.random() * max);
        tenRandomQuestions.push(quizQuestionsCopy[randomIndex]);
        quizQuestionsCopy.splice(randomIndex, 1);
      }

      return tenRandomQuestions;
    }

    return [] as IQuizQuestion[];
  }, [quizQuestions]);

  const startGame = (): void => {
    toggle();
  };

  return (
    <div className="game-screen">
      <TopBar />
      <div className="game-container">
        {playGame ? (
          <Game questions={pick10RandomQuestions()} />
        ) : (
          <GameIntro startGame={startGame} />
        )}
      </div>
    </div>
  );
};

export default GameScreen;
