import React, { useContext } from "react";

import { GameContext } from "../../context/GameProvider";

const GameOverScreen = (): JSX.Element => {
  const {
    gameState: {
      statistics: {
        correctAnswers,
        incorrectAnswers,
        unanswered,
        answerSpeeds,
      },
    },
  } = useContext(GameContext);

  const slowestAnswer = answerSpeeds.reduce((a, b) => {
    return b > a ? b : a;
  });

  const fastestAnswer = answerSpeeds.reduce((a, b) => {
    return b < a ? b : a;
  });

  const averageAnswerTime =
    answerSpeeds.reduce((a, b) => a + b) / answerSpeeds.length;

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
        <div className="stats">
          <span>Snabbaste svaret:</span> <span>{fastestAnswer} s</span>
        </div>
        <div className="stats">
          <span>Långsammaste svaret:</span> <span>{slowestAnswer} s</span>
        </div>
        <div className="stats">
          <span>Medeltid för ett svar:</span>
          <span>{averageAnswerTime.toFixed(2)} s</span>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
