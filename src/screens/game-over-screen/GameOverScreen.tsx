import React, { useContext } from "react";

import { GameContext } from "../../context/GameProvider";

const GameOverScreen = (): JSX.Element => {
  const {
    gameState: {
      statistics: { correctAnswers, incorrectAnswers, unanswered },
    },
  } = useContext(GameContext);

  return (
    <div className="game-over-screen">
      <h1 className="game-over">Game over</h1>
      <p className="text">
        Nu är quizet över, bra jobbat! Nedan kan du se din statistik,
      </p>
      <div className="stats-container">
        <div className="stats">
          <span>Korrekta svar:</span> <span>{correctAnswers} / 10</span>
        </div>
        <div className="stats">
          <span>Inkorrekta svar:</span> <span>{incorrectAnswers} / 10</span>
        </div>
        <div className="stats">
          <span>Obesvarade:</span> <span>{unanswered} / 10</span>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
