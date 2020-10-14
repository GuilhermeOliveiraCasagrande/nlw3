//JSX -> JavaScript XML
import React from 'react';

import Routes from "./routes";

/* 
interface Props { //Cria uma interface TS
  title: string
}

A interface também pode ser declarada assim:
props: {
  title: string
} 
*/

/* 
//Cria um componente -> def no index.tsx
//Coloca para o componente receber propriedades que seguem a interface
function Title(props: Props) {
  return <h1>{props.title}</h1>
} 
*/
import "./styles/global.css"
import "leaflet/dist/leaflet.css"

function App() {
  return (
    //Não usa class, usa className
    <Routes />
  );
}

export default App;
