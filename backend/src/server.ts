import express from "express"
import routes from "./routes"
import "./database/connection"

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

//Express -> lida com REQUISIÇÕES e RESPOSTAS de foma simples
const app = express()
app
    .use(express.json()) /* Habilita entender JSON */
    .use(routes) /* Usa o arquivo de rotas */
    .listen(3000, () => {
        console.log("Server ligado na porta 3000")
    })