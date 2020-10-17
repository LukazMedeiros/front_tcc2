import React from "react";
import { Link } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import "../styles/invalida.css";

export default function Invalida() {
  return (
    <div id="invalida">
      <FaRegTimesCircle size="10rem" color="tomato" />
      <p>
        Você deve estar logado para acessar o conteúdo. Por favor{" "}
        <Link to="/">retorne</Link> e efetue o login
      </p>
    </div>
  );
}
