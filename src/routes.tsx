import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "./pages/landing";
import OrphanagesMap from "./pages/OrphanagesMap";

/* 
Cria um roteamento de páginas do navegador 
path -> componente

exact => vê se o endreço é igual, não se é um incremento
exemplo: exact /supimpasso -> /supimpasso/maneiro não entra


Switch -> força a devolver apenas um único componente
*/

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;