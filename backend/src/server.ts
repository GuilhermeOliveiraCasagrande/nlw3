import express from "express"
import "./database/connection"

import { getRepository } from "typeorm"
import Orphanage from "./models/Orphanage"

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
    .use(express.json())
    .post("/orphanages", async (req, res) => {
        /* Desestrutura o body da requisição em variáveis relevantes */
        const {
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends
        } = req.body

        const orphanageRepo = getRepository(Orphanage) //Pega o repositório de orfanatos na class Orphanage

        const orphanage = orphanageRepo.create({/* Cria uma entidade orfanot */
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends
        })

        await orphanageRepo.save(orphanage) /* Salva o orfanato no DB */

        return res.status(201).json(orphanage) //201 -> criou e deu certo
    }).listen(3000, () => {
        console.log("Server ligado na porta 3000")
    })

//Driver nativo => db.query("select * from users")
//Query builder => db.select("*").from("users").where("name", "Guilherme")
//ObjectRelationalMapping => tabela users -> User, select * from users -> User, User, User, User, ...

//Query Builder, ORM -> integra com quase qualquer outro DB