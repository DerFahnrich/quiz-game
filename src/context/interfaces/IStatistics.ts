export default interface IStatistics {
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  quickestAnswer?: number;
  slowestAnswer?: number;
  averageTime?: number;
  answerSpeeds: number[];
}
