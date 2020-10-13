import express from "express"

const app = express()
app
    .get("/", (req, res) => {
        res.send("<h1>Bom dia!</h1>")
    }).listen(3000, () => {
        console.log("Server ligado na porta 3000")
    })

//Express -> lida com REQUISIÇÕES e RESPOSTAS de foma simples