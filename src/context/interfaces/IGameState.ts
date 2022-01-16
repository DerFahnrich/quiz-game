import IQuizQuestion from "../../screens/game-screen/interfaces/IQuizQuestion";
import IStatistics from "./IStatistics";
import { TGameStatus } from "../types/TGameType";

export default interface IGameState {
  gameStatus: TGameStatus;
  quizQuestions?: IQuizQuestion[];
  statistics: IStatistics;
}
