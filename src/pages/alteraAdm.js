import React, { useState } from "react";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import { FaSearch } from "react-icons/fa";
import "../styles/alteraAdm.css";
import { useHistory } from "react-router-dom";

export default function AlteraAdm() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const tipo = sessionStorage.getItem("tipo");

  function cancelar(e) {
    e.preventDefault();
    history.push("/inicialadm");
  }

  if (usuario === "" || !usuario || tipo !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="alteraadm">
      <Aside />
      <div className="main">
        <form action="">
          <div className="form-group">
            <div className="col-g8 col-m8 col-p12">
              <input type="text" />
            </div>
            <div className="col-g4 col-m4 col-p12">
              <button>
                Pesquisar{" "}
                <FaSearch size={"18px"} color="var(--textoSecundario)" />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Nome</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="">RA</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="">CPF</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="">Senha</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="">Tipo</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <div className="col-g6 col-m6 col-p12">
              <button>Salvar</button>
            </div>
            <div className="col-g6 col-m6 col-p12">
              <button onClick={cancelar}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
