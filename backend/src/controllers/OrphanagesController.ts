import { getRepository } from "typeorm"
//Driver nativo => db.query("select * from users")
//Query builder => db.select("*").from("users").where("name", "Guilherme")
//ObjectRelationalMapping => tabela users -> User, select * from users -> User, User, User, User, ...

//Query Builder, ORM -> integra com quase qualquer outro DB

import Orphanage from "../models/Orphanage" /* Importa o tipo dos dados necessários para um orfanato */
import orphanageView from "../views/orphanages_view" /* Importa a rendereização de dados para enviar ao usuário */


import * as yup from "yup" /* Importa a biblioteca de validação de dados */

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

        const data = { /* Separa os dados para serem validados */
            name, latitude,
            longitude, about,
            instructions, opening_hours,
            open_on_weekends: open_on_weekends === "true"
            , images
        }

        /* Cria uma forma para os dados serem encaixados */
        const schema = yup.object().shape({
            name: yup.string().required("nome obrigatório"), /* deve ter um atributo name que deve ser uma string */
            latitude: yup.number().required("latitude obrigatório"),
            longitude: yup.number().required("longitude obrigatório"),
            about: yup.string().required("about obrigatório").max(300),
            instructions: yup.string().required("instructions obrigatório"),
            opening_hours: yup.string().required("opening_hours obrigatório"),
            open_on_weekends: yup.boolean().required("open_on_weekends obrigatório"),
            images: yup.array( /* deve ter um atributo images que é array */
                yup.object().shape({ /* de objetos que tem */
                    path: yup.string().required("image.path obrigatório"), /* um atributo string path obrigatório*/
                })
            )
        })

        /* Valida todos os campos do objeto dados, se der erro cai no error handler */
        await schema.validate(data, {
            abortEarly: false /* Se algum campo estiver errado, NÃO acabar e devolver um erro */
        }).catch((err) => {
            return res.status(500).json({ message: "Invalid data", errors: err.errors })
        })

        /* Cria uma entidade orfanto baseado nos dados validados */
        const orphanage = orphanageRepo.create(data)

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