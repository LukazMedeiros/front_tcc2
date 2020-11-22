import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/aside.css";

export default function Aside() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("nome");

  function alterar(e) {
    e.preventDefault();
    history.push("/AlteraAdm");
  }

  function logout(e) {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="aside">
      <div className="logotipo">
        <p>logotipo</p>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <p>Bem vindo {usuario}</p>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <button onClick={alterar}>Alterar Dados</button>
      </div>
      <div className="col-g12 col-m12 col-p12">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
