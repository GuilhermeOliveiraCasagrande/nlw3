import { getRepository } from "typeorm"
import Orphanage from "../models/Orphanage"
import orphanageView from "../views/orphanages_view"
//Driver nativo => db.query("select * from users")
//Query builder => db.select("*").from("users").where("name", "Guilherme")
//ObjectRelationalMapping => tabela users -> User, select * from users -> User, User, User, User, ...

//Query Builder, ORM -> integra com quase qualquer outro DB

import { Request, Response } from "express" /* Importa os tipos de request e response */

export default {
    async index(req: Request, res: Response) {
        const orphanageRepo = getRepository(Orphanage) //Pega o repositório de orfanatos na class Orphanage
        const orphanages = await orphanageRepo.find({ /* Pega todos os orfanatos */
            relations: ["images"] /* Também já acha as imagens */
        })
        return res.status(200).json(orphanageView.renderMany(orphanages)) /* Saída é determinada pela view */
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

        /* Pega os arquivos enviados pela request */
        const reqImages = req.files as Express.Multer.File[] /* Diz que é um array de arquivos */

        /* Transforma em um array de objetos só com os paths das imagens */
        const images = reqImages.map(img => { return { path: img.filename } })

        const orphanage = orphanageRepo.create({/* Cria uma entidade orfanto */
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends, images
        })

        await orphanageRepo.save(orphanage) /* Salva o orfanato no DB */

        //devolve 201 -> criou e deu certo
        /* usa a view para enviar os dados em um formato relevante ao usuário */
        return res.status(201).json(orphanageView.render(orphanage)) 
    },
    async show(req: Request, res: Response) {
        const { id } = req.params /* Pega o id do endereço */
        const orphanageRepo = getRepository(Orphanage)
        return await orphanageRepo.findOneOrFail(id, { /* Acha o orfanato pelo id, se não achar dá erro */
            relations: ['images'] /* Já acha as imagens */
        })
                /* Se deu certo, dê uma resposta de sucesso */
            .then(orphanage => res.status(200).json(orphanageView.render(orphanage)))

                /* Se não dá uma resposta de erro que não achou */
            .catch(() => { res.status(404).json({ message: "orphanage not found" }) })
    }
}