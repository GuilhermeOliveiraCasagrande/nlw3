import { getRepository } from "typeorm"
import Orphanage from "../models/Orphanage"
//Driver nativo => db.query("select * from users")
//Query builder => db.select("*").from("users").where("name", "Guilherme")
//ObjectRelationalMapping => tabela users -> User, select * from users -> User, User, User, User, ...

//Query Builder, ORM -> integra com quase qualquer outro DB

import { Request, Response } from "express"

export default {
    async index(req: Request, res: Response) {
        const orphanageRepo = getRepository(Orphanage) //Pega o repositório de orfanatos na class Orphanage
        const orphanages = await orphanageRepo.find()
        return res.status(200).json(orphanages)
    },
    async create(req: Request, res: Response) {
        /* Desestrutura o body da requisição em variáveis relevantes */
        const {
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends
        } = req.body

        const orphanageRepo = getRepository(Orphanage)

        const orphanage = orphanageRepo.create({/* Cria uma entidade orfanot */
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends
        })

        await orphanageRepo.save(orphanage) /* Salva o orfanato no DB */

        return res.status(201).json(orphanage) //201 -> criou e deu certo
    },
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanageRepo = getRepository(Orphanage)
        return await orphanageRepo.findOneOrFail(id)
            .then(orphanage => res.status(200).json(orphanage))
            .catch(() => { res.status(404).json({ message: "orphanage not found" }) })
    }
}