import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/aside.css";

export default function Aside() {
  const history = useHistory();

  function novo(e) {
    e.preventDefault();
    history.push("/ticketusuario");
  }

  function alterar(e) {
    e.preventDefault();
    history.push("/alterausuario");
  }

  return (
    <div className="aside">
      <div className="logotipo">
        <p>logotipo</p>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <p>Bem vindo usuario</p>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <button onClick={alterar}>Alterar Dados</button>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <button onClick={novo}>novo ticket</button>
      </div>
    </div>
  );
}
