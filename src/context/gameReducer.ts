import IAction from "./interfaces/IAction";
import IGameState from "./interfaces/IGameState";

function gameReducer(gameState: IGameState, action: IAction): IGameState {
  switch (action.type) {
    default:
      return gameState;
  }
}

export default gameReducer;
