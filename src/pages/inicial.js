import React, { useEffect, useState } from "react";
import api from "../services/axios";
import Aside from "../components/aside";
import Invalida from "./invalida";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import "../styles/inicial.css";

export default function Inicial() {
  const usuario = sessionStorage.getItem("ra");
  const acesso = sessionStorage.getItem("tipo");
  const [chamados, setChamados] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api
      .get("/incidente", { headers: { usuario: usuario } })
      .then((resposta) => setChamados(resposta.data));
  }, [usuario]);

  async function pesquisar(e) {
    e.preventDefault();
    try {
      const resposta = await api.get(`incidente/${status}/${usuario}`);
      setChamados(resposta.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function encerrar(id) {
    console.log(id);
    const resolucao = "encerrado pelo usuário";
    const dados = { id, resolucao };
    try {
      await api.put("/incidente", dados);
      setChamados(chamados.filter((incidente) => incidente.id !== id));
    } catch (error) {
      console.error(`erro ao pesquisar ${error}`);
    }
  }

  if (usuario === "" || !usuario || acesso !== "comum") {
    return <Invalida />;
  }
  return (
    <div id="inicial">
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
                <FaTrashAlt size={"18px"} />
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
