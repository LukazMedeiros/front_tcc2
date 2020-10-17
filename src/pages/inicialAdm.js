import React, { useState } from "react";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import { FaSearch } from "react-icons/fa";

import "../styles/inicialadm.css";

export default function InicialAdm() {
  const usuario = sessionStorage.getItem("ra");
  const tipo = sessionStorage.getItem("tipo");
  if (usuario === "" || !usuario || tipo !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="inicialadm">
      <Aside />
      <div className="main">
        <form action="">
          <div className="form-group">
            <div className="col-g8 col-m8 col-p12">
              <input type="text" name="" id="" />
            </div>
            <div className="col-g4 col-m4 col-p12">
              <button>Pesquisar</button>
            </div>
          </div>
        </form>
        <div className="card">card</div>
      </div>
    </div>
  );
}
