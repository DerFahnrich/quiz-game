import IAction from "./IAction";
import IGameState from "./IGameState";

export default interface IGameContext {
  gameState: IGameState;
  gameDispatch: React.Dispatch<IAction>;
}
