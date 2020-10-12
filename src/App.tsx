//JSX -> JavaScript XML
import React from 'react';

import { FiArrowRight } from "react-icons/fi"

import "./styles/global.css"; //Importa o CSS para usar
import "./styles/pages/landing.css";

import logoImg from "./images/logo.svg";

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

function App() {
  return (
    //Não usa class, usa className
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>
        <div className="location">
          <strong>São José dos Campos</strong>
          <span>São Paulo</span>
        </div>

        <a href="" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
        </a>
      </div>
    </div>
  );
}

export default App;
