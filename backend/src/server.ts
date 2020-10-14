import express from "express" /* Importa o framework do express para criar um servidor */
import routes from "./routes" /* Importa as rotas do servidor */
import path from "path" /* Importa a biblioteca nativa de criar caminho de arquivos */
import "./database/connection" /* Importa a conexão com o db */
import errorHandler from "./errors/handler" /* Importa o errorHandler para lidar com erros */
import "express-async-errors" /* Para mexer com erros em funções asíncronas no express */
import cors from "cors"

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
app.use(cors()) /* Libera o acesso para usuários */

app.use(express.json()) /* Habilita entender JSON */

app.use(routes) /* Usa o arquivo de rotas */

/* Prepara para uso a pasta de imagens enviadas */
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))

app.use(errorHandler) /* Aplica o error handler */

app.listen(3333, () => {
    console.log("Server ligado na porta 3333")
})