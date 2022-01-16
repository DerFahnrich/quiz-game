import IQuizQuestion from "../screens/game-screen/interfaces/IQuizQuestion";
import IAction from "./interfaces/IAction";

export const SET_QUIZ_QUESTIONS = "SET_QUIZ_QUESTIONS";
export const UPDATE_GAME_STATUS = "UPDATE_GAME_STATUS";

export const setQuizQuestions = (quizQuestions: IQuizQuestion[]): IAction => {
  return { type: SET_QUIZ_QUESTIONS, payload: quizQuestions };
};

export const updateGameStatus = (newGameStatus: string): IAction => {
  return { type: UPDATE_GAME_STATUS, payload: newGameStatus };
};
