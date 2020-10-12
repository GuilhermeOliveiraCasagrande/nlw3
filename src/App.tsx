//JSX -> JavaScript XML
import React from 'react';

interface Props { //Cria uma interface TS
  title: string
}

/*
A interface também pode ser declarada assim:
props: {
  title: string
} 
*/

//Cria um componente -> def no index.tsx
//Coloca para o componente receber propriedades que seguem a interface
function Title(props: Props) {
  return <h1>{props.title}</h1>
}

function App() {
  return (
    //Não usa class, usa className
    <div className="App">
      <Title title="supimpasso" />
      <h1>Olá mundo!</h1>
    </div>
  );
}

export default App;
