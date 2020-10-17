import React, { useState } from "react";
import Aside from "../components/aside";
import Invalida from "./invalida";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import "../styles/inicial.css";

export default function Inicial() {
  const usuario = sessionStorage.getItem("ra");
  const tipo = sessionStorage.getItem("tipo");
  if (usuario === "" || !usuario || tipo !== "comum") {
    return <Invalida />;
  }
  return (
    <div id="inicial">
      <Aside />
      <div className="main">
        <form action="">
          <div className="form-group">
            <div className="col-g8 col-m8 col-p12">
              <input type="text" name="" id="" />
            </div>
            <div className="col-g4 col-m4 col-p12">
              <button>
                Pesquisar{" "}
                <FaSearch size={"18px"} color="var(--textoSecundario)" />
              </button>
            </div>
          </div>
        </form>
        <div className="card">
          card
          <button>
            <FaTrashAlt size={"18px"} />
          </button>
        </div>
      </div>
    </div>
  );
}
