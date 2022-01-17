import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";

import LifeLines from "./LifeLines";
import Button from "../../../components/button/Button";
import useCountDown from "../../../hooks/useCountDown";
import useCounter from "../../../hooks/useCounter";
import useTimer from "../../../hooks/useTimer";

import { GAME_OVER } from "../../../assets/constants/gameStatusConstants";
import { GameContext } from "../../../context/GameProvider";

import {
  updateGameStatus,
  updateGameStatistics,
} from "../../../context/gameActions";

import IQuizQuestion from "../interfaces/IQuizQuestion";
import IStatistics from "../../../context/interfaces/IStatistics";

interface IGameProps {
  questions: IQuizQuestion[];
}

const Game = ({ questions }: IGameProps): JSX.Element => {
  const [showNextButton, setNextButton] = useState(false);
  const { count, increment } = useCounter();
  const { gameDispatch } = useContext(GameContext);
  const { startTimer, endTimerAndGetTime } = useTimer();
  const pauseGame = useRef(false);

  const [statistics, setStatistics] = useState<IStatistics>({
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    answerSpeeds: [],
  });

  const [
    timerCount,
    { start: startCountDown, stop: stopCountDown, reset: resetCounter },
  ] = useCountDown({
    seconds: 15,
    interval: 1000,
  });

  const checkAnswer = useCallback(
    (givenAnswer?: string): void => {
      stopCountDown();
      setNextButton(true);

      const exactTimeOfAnswer = endTimerAndGetTime();
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

      setStatistics((oldState) => {
        return {
          ...oldState,
          answerSpeeds: [...oldState.answerSpeeds, exactTimeOfAnswer],
        };
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
    [count, endTimerAndGetTime, questions, stopCountDown]
  );

  const handleOnClick = useCallback(() => {
    if (count === questions.length - 1) {
      gameDispatch(updateGameStatistics(statistics));
      gameDispatch(updateGameStatus(GAME_OVER));
    } else {
      gameDispatch(updateGameStatistics(statistics));
      setNextButton(false);
      resetCounter();
      pauseGame.current = false;

      const elements = document.querySelectorAll(".answer");

      elements.forEach((element) => {
        const { firstChild } = element;

        firstChild?.classList.remove("correct-answer");
        firstChild?.classList.remove("wrong-answer");
      });

      increment();
    }
  }, [
    count,
    gameDispatch,
    increment,
    questions.length,
    resetCounter,
    statistics,
  ]);

  const addTenSeconds = useCallback(() => {
    resetCounter(timerCount + 10);
    startCountDown();
  }, [resetCounter, startCountDown, timerCount]);

  const removeTwoOptions = useCallback(() => {
    const { correctAnswer } = questions[count];

    const elements = document.querySelectorAll(".answer");

    let i = 0;
    while (i < 2) {
      const randomIndex = Math.floor(Math.random() * elements.length);
      const { firstChild } = elements[randomIndex];

      if (firstChild?.textContent !== correctAnswer) {
        elements[randomIndex].classList.add("wrong-answer");
        i += 1;
      }
    }
  }, [count, questions]);

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
    startCountDown();
    startTimer();

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
      <LifeLines
        addTenSeconds={addTenSeconds}
        removeTwoOptions={removeTwoOptions}
      />
      {renderQuestion(questions[count])}
      <span className="timer">{timerCount}:00</span>
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
