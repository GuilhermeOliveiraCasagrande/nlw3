import express from "express"

/* Métodos HTTP
    GET -> buscando info
    POST -> criando novo info
    PUT -> alterando info
    DELETE -> removendo info
*/

/* Parâmetros
    Query params: localhost:3000/users?filter=active
    Route params: localhost:3000/users/1
    Body params: vão no body da requisição
*/

const app = express()
app
    .use(express.json())
    .get("/users/:id", (req, res) => {
        
    }).listen(3000, () => {
        console.log("Server ligado na porta 3000")
    })

//Express -> lida com REQUISIÇÕES e RESPOSTAS de foma simples