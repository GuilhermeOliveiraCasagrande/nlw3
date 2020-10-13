//index -> primeiro arquivo carregado

import React from 'react'; //biblioteca do react
import ReactDOM from 'react-dom'; //react + DOM do HTML
import App from './App'; //Importa um componente -> function que retorna html

ReactDOM.render( //Renderiza algo em HTML
  <App />, //Coloca o componente
  document.getElementById('root')
);

