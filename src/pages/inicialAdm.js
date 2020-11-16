import React, { useEffect, useState } from "react";
import api from "../services/axios";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import { FaSearch, FaArrowRight } from "react-icons/fa";

import "../styles/inicialadm.css";
import { useHistory } from "react-router-dom";

export default function InicialAdm() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const acesso = sessionStorage.getItem("tipo");
  const [chamados, setChamados] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/adm").then((resposta) => setChamados(resposta.data));
  }, [usuario]);

  async function pesquisar(e) {
    e.preventDefault();
    try {
      const resposta = await api.get(`adm/${status}`);
      setChamados(resposta.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function encerrar(id) {
    localStorage.setItem("ticket", id);
    history.push("/ticketAdm");
  }

  if (usuario === "" || !usuario || acesso !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="inicialadm">
      <Aside />
      <div className="main">
        <form onSubmit={pesquisar}>
          <div className="form-group">
            <div className="col-g8 col-m8 col-p12">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  selecione
                </option>
                <option value="aberto">Abertos</option>
              <option value="solucionado">Solucionados</option>
              <option value="pendente">Pendentes</option>
              </select>
            </div>
            <div className="col-g4 col-m4 col-p12">
              <button>
                Pesquisar{" "}
                <FaSearch size={"18px"} color="var(--textoSecundario)" />
              </button>
            </div>
          </div>
        </form>
        {chamados.map((chamado) => (
          <div className="card" key={chamado.id}>
            <div className="col-g9 col-m9 col-p9">
              <p>Status: {chamado.status}</p>
            </div>
            <div className="col-g3 col-m3 col-p3">
              <button onClick={() => encerrar(chamado.id)}>
                <FaArrowRight size={"18px"} />
              </button>
            </div>
            <div className="col-g12 col-m12 col-p12">
              <p>Abertura: {chamado.data_abertura}</p>
            </div>
            <div className="col-g12 col-m12 col-p12">
              <p>Título: {chamado.titulo}</p>
            </div>
            <div className="col-g12 col-m12 col-p12">
              <p>Descrição: {chamado.descricao}</p>
            </div>
            <div className="col-g12 col-m12 col-p12">
              <p>Resolução: {chamado.resolucao}</p>
            </div>
            <div className="col-g12 col-m12 col-p12">
              <p>Encerramento: {chamado.data_encerramento}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
