import IQuizAnswer from "./IQuizAnswer";

export default interface IQuizQuestion {
  answers: IQuizAnswer;
  correctAnswer: string;
  image?: string;
  question: string;
}
