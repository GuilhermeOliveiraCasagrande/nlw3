import { getRepository } from "typeorm"
import Orphanage from "../models/Orphanage"
//Driver nativo => db.query("select * from users")
//Query builder => db.select("*").from("users").where("name", "Guilherme")
//ObjectRelationalMapping => tabela users -> User, select * from users -> User, User, User, User, ...

//Query Builder, ORM -> integra com quase qualquer outro DB

import { Request, Response } from "express"

export default {
    async createOrphanage(req: Request, res: Response) {
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
    }
}