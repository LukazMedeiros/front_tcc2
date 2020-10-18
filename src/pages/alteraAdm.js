import React, { useState } from "react";
import api from "../services/axios";
import Aside from "../components/asideAdm";
import Invalida from "./invalida";
import { FaSearch } from "react-icons/fa";
import "../styles/alteraAdm.css";
import { useHistory } from "react-router-dom";

export default function AlteraAdm() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const acesso = sessionStorage.getItem("tipo");
  const [alvo, setAlvo] = useState("");
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  function cancelar(e) {
    e.preventDefault();
    history.push("/inicialadm");
  }

  function cpfMask(e) {
    var entrada = e.target.value;
    entrada = entrada.replace(/\D/g, "");
    e.target.value = entrada;
    setCpf(e.target.value);
  }

  async function pesquisar(e) {
    e.preventDefault();
    try {
      const resposta = await api.get("/usuario", {
        headers: { usuario: alvo },
      });
      setNome(resposta.data[0].nome);
      setRa(resposta.data[0].ra);
      setCpf(resposta.data[0].cpf);
      setTipo(resposta.data[0].tipo);
    } catch (error) {
      alert(`erro ${error}`);
    }
  }

  async function salvar(e) {
    e.preventDefault();
    const dados = { nome, ra, cpf, tipo, senha };
    try {
      const resposta = await api.put("/usuario", dados, {
        headers: { usuario: alvo },
      });
      alert(`${resposta.data.mensagem}`);
      sessionStorage.clear();
      localStorage.clear();
      history.push("/");
    } catch (error) {
      alert(`Erro! verifique os campos`);
    }
  }

  if (usuario === "" || !usuario || acesso !== "administrador") {
    return <Invalida />;
  }
  return (
    <div id="alteraadm">
      <Aside />
      <div className="main">
        <form onSubmit={salvar}>
          <div className="form-group">
            <div className="col-g8 col-m8 col-p12">
              <input
                type="text"
                placeholder="RA"
                value={alvo}
                onChange={(e) => setAlvo(e.target.value)}
              />
            </div>
            <div className="col-g4 col-m4 col-p12">
              <button onClick={pesquisar}>
                Pesquisar{" "}
                <FaSearch size={"18px"} color="var(--textoSecundario)" />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">RA</label>
            <input
              type="text"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">CPF</label>
            <input type="text" maxLength="11" value={cpf} onChange={cpfMask} />
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
            <label htmlFor="">Tipo</label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
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
