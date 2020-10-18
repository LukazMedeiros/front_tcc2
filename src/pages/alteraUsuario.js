import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import crypto from "crypto";
import Aside from "../components/aside";
import Invalida from "./invalida";
import api from "../services/axios";
import {} from "react-icons/fa";
import "../styles/alteraUsuario.css";

export default function AlteraUsuario() {
  const history = useHistory();
  const usuario = sessionStorage.getItem("ra");
  const nome = sessionStorage.getItem("nome");
  const cpf = sessionStorage.getItem("cpf");
  const acesso = sessionStorage.getItem("tipo");
  const tipo = sessionStorage.getItem("tipo");
  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  function cancelar(e) {
    e.preventDefault();
    history.push("/inicial");
  }

  async function alterar(e) {
    e.preventDefault();
    const senha = nova;
    const ra = usuario;
    const segredo = crypto.createHash("md5", atual).update(atual).digest("hex");
    const dados = { cpf, nome, tipo, senha, ra };

    try {
      const cadastrada = await api.get("usuario", {
        headers: { usuario: usuario },
      });
      if (cadastrada.data[0].senha !== segredo) {
        alert(`senha atual incorreta`);
      } else if (nova !== confirmacao) {
        alert(`O campo senha e de confirmação devem ser iguais`);
      } else {
        const resposta = await api.put("/usuario", dados, {
          headers: { usuario: usuario },
        });
        alert(`${resposta.data.mensagem}`);
        sessionStorage.clear();
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      alert(`Erro ao validar`);
    }
  }

  if (usuario === "" || !usuario || acesso !== "comum") {
    return <Invalida />;
  }
  return (
    <div id="alterausuario">
      <Aside />
      <div className="main">
        <form onSubmit={alterar}>
          <div className="form-group">
            <label htmlFor="">Senha Atual</label>
            <input
              type="password"
              value={atual}
              onChange={(e) => setAtual(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Nova senha</label>
            <input
              type="password"
              value={nova}
              onChange={(e) => setNova(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Confirme a senha</label>
            <input
              type="password"
              value={confirmacao}
              onChange={(e) => setConfirmacao(e.target.value)}
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
