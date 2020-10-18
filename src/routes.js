import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

// importando paginas
import Home from "./pages/home";
import Inicial from "./pages/inicial";
import InicialAdm from "./pages/inicialAdm";
import TicketAdm from "./pages/ticketAdm";
import AlteraAdm from "./pages/alteraAdm";
import AlteraUsuario from "./pages/alteraUsuario";
import TicketUsuario from "./pages/ticketUsuario";

export default function Rota() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Inicial" exact component={Inicial} />
        <Route path="/InicialAdm" exact component={InicialAdm} />
        <Route path="/ticketAdm" exact component={TicketAdm} />
        <Route path="/AlteraAdm" exact component={AlteraAdm} />
        <Route path="/alteraUsuario" exact component={AlteraUsuario} />
        <Route path="/ticketUsuario" exact component={TicketUsuario} />
      </Switch>
    </BrowserRouter>
  );
}
