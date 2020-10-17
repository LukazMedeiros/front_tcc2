import React from "react";
import ReactDOM from "react-dom";
import Rotas from "./routes";

// css
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/grid.css";

ReactDOM.render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>,
  document.getElementById("root")
);
