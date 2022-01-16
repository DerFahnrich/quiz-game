import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";

import Button from "../../../components/button/Button";
import useCountDown from "../../../hooks/useCountDown";
import useCounter from "../../../hooks/useCounter";

import { GameContext } from "../../../context/GameProvider";
import { updateGameStatus } from "../../../context/gameActions";
import { GAME_OVER } from "../../../assets/constants/gameStatusConstants";

import IQuizQuestion from "../interfaces/IQuizQuestion";
import IStatistics from "../../../context/interfaces/IStatistics";

interface IGameProps {
  questions: IQuizQuestion[];
}

const Game = ({ questions }: IGameProps): JSX.Element => {
  const [showNextButton, setNextButton] = useState(false);
  const { count, increment } = useCounter();
  const pauseGame = useRef(false);
  const { gameDispatch } = useContext(GameContext);

  const [statistics, setStatistics] = useState<IStatistics>({
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
  });

  const [timerCount, { start, stop, reset: resetCounter }] = useCountDown({
    seconds: 15,
    interval: 1000,
  });

  const checkAnswer = useCallback(
    (givenAnswer?: string): void => {
      stop();
      setNextButton(true);

      const { correctAnswer } = questions[count];

      const elements = document.querySelectorAll(".answer");

      elements.forEach((element) => {
        const { firstChild } = element;

        if (firstChild?.textContent === correctAnswer) {
          element.classList.add("correct-answer");
        } else {
          element.classList.add("wrong-answer");
        }
      });

      if (!givenAnswer) {
        setStatistics((oldStats) => {
          return { ...oldStats, unanswered: oldStats.unanswered + 1 };
        });
      }

      if (givenAnswer === correctAnswer) {
        setStatistics((oldStats) => {
          return { ...oldStats, correctAnswers: oldStats.correctAnswers + 1 };
        });
      }

      if (givenAnswer && givenAnswer !== correctAnswer) {
        setStatistics((oldStats) => {
          return {
            ...oldStats,
            incorrectAnswers: oldStats.incorrectAnswers + 1,
          };
        });
      }
    },

    [count, questions, stop]
  );

  const handleOnClick = useCallback(() => {
    if (count === questions.length - 1) {
      gameDispatch(updateGameStatus(GAME_OVER));
    } else {
      setNextButton(false);
      resetCounter();
      pauseGame.current = false;
      increment();
    }
  }, [count, gameDispatch, increment, questions.length, resetCounter]);

  const renderQuestion = (question: IQuizQuestion): JSX.Element => {
    return (
      <>
        <div className="question">
          {question.image && (
            <div className="question-image">
              <img src="" alt="" />
            </div>
          )}
          <span className="question-text">{question.question}</span>
        </div>
        <div className="question-answers">
          {Object.entries(question.answers).map((answer) => (
            <div
              aria-hidden
              className="answer"
              key={answer[1]}
              role="button"
              onClick={() => checkAnswer(answer[0])}
            >
              <span className="alternative">{answer[0]}</span>
              <span className="text">{answer[1]}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (!pauseGame.current && timerCount === 0) {
      pauseGame.current = true;
      checkAnswer();
    }
  }, [checkAnswer, timerCount]);

  return (
    <div className="question-container">
      {renderQuestion(questions[count])}
      <div>{timerCount}:00</div>
      {showNextButton && (
        <Button
          text={count === questions.length - 1 ? "Avsluta" : "Nästa fråga"}
          onclick={handleOnClick}
        />
      )}
    </div>
  );
};

export default Game;
