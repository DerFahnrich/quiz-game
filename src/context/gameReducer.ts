import IAction from "./interfaces/IAction";
import IGameState from "./interfaces/IGameState";

import {
  SET_QUIZ_QUESTIONS,
  UPDATE_GAME_STATISTICS,
  UPDATE_GAME_STATUS,
} from "./gameActions";

function gameReducer(gameState: IGameState, action: IAction): IGameState {
  const args: [IGameState, IAction] = [gameState, action];

  switch (action.type) {
    case SET_QUIZ_QUESTIONS:
      return setQuizQuestions(...args);
    case UPDATE_GAME_STATISTICS:
      return updateGameStatistics(...args);
    case UPDATE_GAME_STATUS:
      return updateGameStatus(...args);
    default:
      return gameState;
  }
}

export default gameReducer;

function setQuizQuestions(gameState: IGameState, action: IAction): IGameState {
  return { ...gameState, quizQuestions: action.payload };
}

function updateGameStatistics(
  gameState: IGameState,
  action: IAction
): IGameState {
  return { ...gameState, statistics: action.payload };
}
function updateGameStatus(gameState: IGameState, action: IAction): IGameState {
  return { ...gameState, gameStatus: action.payload };
}
