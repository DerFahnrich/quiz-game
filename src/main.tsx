import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GameProvider from "./context/GameProvider";

import "./assets/scss/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
