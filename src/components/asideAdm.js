import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/aside.css";

export default function Aside() {
  const history = useHistory();

  function alterar(e) {
    e.preventDefault();
    history.push("/AlteraAdm");
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
    </div>
  );
}
