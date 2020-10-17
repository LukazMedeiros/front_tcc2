import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/axios";
import "../styles/home.css";

export default function Home() {
  const history = useHistory();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function Entrar(e) {
    e.preventDefault();
    const dados = { usuario, senha };

    try {
      const resposta = await api.post("/sessao", dados);
      sessionStorage.setItem("ra", resposta.data.ra);
      sessionStorage.setItem("nome", resposta.data.nome);
      sessionStorage.setItem("tipo", resposta.data.tipo);
      sessionStorage.setItem("cpf", resposta.data.cpf);
      if (resposta.data.tipo === "administrador") {
        history.push("/inicialadm");
      }
      if (resposta.data.tipo !== "administrador") {
        history.push("/inicial");
      }
    } catch (error) {
      alert(`Erro ao efetuar login - Verifique o usuário e/ou senha!`);
    }
  }

  return (
    <div id="home">
      <div className="logo">logotipo</div>
      <div className="form">
        <form onSubmit={Entrar}>
          <div className="form-group">
            <label htmlFor="">RA:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
