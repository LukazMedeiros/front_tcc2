import React, { useState } from "react";
import Aside from "../components/aside";
import Invalida from "./invalida";
import {} from "react-icons/fa";
import "../styles/ticketUsuario.css";
import { useHistory } from "react-router-dom";
import api from "../services/axios";

export default function TicketUsuario() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const acesso = sessionStorage.getItem("tipo");
  const [titulo, setTtitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  function cancelar(e) {
    e.preventDefault();
    history.push("/inicial");
  }

  async function Salvar(e) {
    e.preventDefault();
    const dados = { titulo, descricao };
    console.log(titulo);
    console.log(descricao);
    try {
      const resposta = await api.post("/incidente", dados, {
        headers: { usuario: usuario },
      });
      console.log(resposta.status);
      if (resposta.status === 201) {
        alert(`${resposta.data.mensagem}`);
        history.push("/inicial");
      } else {
        alert(`Erro! ${resposta.data.mensagem}`);
      }
    } catch (error) {
      alert(`Erro! ${error}`);
    }
  }

  if (usuario === "" || !usuario || acesso !== "comum") {
    return <Invalida />;
  }
  return (
    <div id="ticketusuario">
      <Aside />
      <div className="main">
        <form onSubmit={Salvar}>
          <div className="form-group">
            <label htmlFor="">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTtitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
