import React from "react";
import Button from "../../../components/button/Button";

interface IGameIntroProps {
  startGame: () => void;
}

const GameIntro = ({ startGame }: IGameIntroProps): JSX.Element => {
  const handleOnClick = (): void => {
    startGame();
  };

  return (
    <div className="game-intro">
      <h1>Läs innan du startar!</h1>
      <p>
        Detta är ett quiz om det vi alla älskar... programmering! Tio frågor
        kommer du få svara på, en och en. För varje fråga får du fyra
        svarsalternativ och en tidsbegränsning på 15 sekunder.
      </p>
      <p>
        När du har svarat så får du direkt veta om du svarade rätt eller inte,
        men kom ihåg att svara inom 15 sekunder för annars så räknas ditt svar
        automatiskt som felaktigt.
      </p>
      <p>Din kvarvarande tid för varje fråga kan du se uppe i högra hörnet.</p>
      <Button text="Kör!" onclick={handleOnClick} />
    </div>
  );
};

export default GameIntro;
