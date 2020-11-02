import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import {} from "react-icons/fa";
import "../styles/ticketAdm.css";
import api from "../services/axios";
import { render } from "@testing-library/react";

export default function TicketAdm() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const acesso = sessionStorage.getItem("tipo");
  const nome = sessionStorage.getItem("nome");
  const id = localStorage.getItem("ticket");
  const [chamado, setChamado] = useState([]);
  const [resolucao, setResolucao] = useState("");

  useEffect(() => {
    api.get(`/ticket/${id}`).then((resposta) => setChamado(resposta.data));
  }, [usuario]);

  function cancelar(e) {
    e.preventDefault();
    localStorage.clear();
    history.push("/inicialadm");
  }

  async function encerrar(e) {
    e.preventDefault();
    const dados = { resolucao };
    const resposta = await api.put(`/adm/${id}`, dados, {
      headers: { responsavel: nome },
    });
    alert(`${resposta.data.mensagem}`);
    history.push('/InicialAdm')
  }

  if (usuario === "" || !usuario || acesso !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="ticketadm">
      <Aside />
      <div className="main">
        <form onSubmit={encerrar}>
          <div className="form-group">
            {chamado.map((chamado) => (
              <ul key={chamado.id}>
                <li>
                  <p>Status: {chamado.status}</p>
                </li>
                <li>
                  <p>Título: {chamado.titulo}</p>
                </li>
                <li>
                  <p>Descrição: {chamado.descricao}</p>
                </li>
                <li>
                  <p>Solicitante: {chamado.solicitante}</p>
                </li>
                <li>
                  <p>Abertura: {chamado.data_abertura}</p>
                </li>
              </ul>
            ))}
            <label htmlFor="">Resolução</label>
            <textarea
              value={resolucao}
              onChange={(e) => setResolucao(e.target.value)}
            ></textarea>
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
