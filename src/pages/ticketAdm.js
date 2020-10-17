import React, { useState } from "react";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import {} from "react-icons/fa";
import "../styles/ticketAdm.css";

export default function TicketAdm() {
  const usuario = sessionStorage.getItem("ra");
  const tipo = sessionStorage.getItem("tipo");
  if (usuario === "" || !usuario || tipo !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="ticketadm">
      <Aside />
      <div className="main">
        <form action="">
          descrição do ticket
          <div className="form-group">
            <label htmlFor="">Resolução</label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <div className="col-g6 col-m6 col-p12">
              <button>Salvar</button>
            </div>
            <div className="col-g6 col-m6 col-p12">
              <button>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
