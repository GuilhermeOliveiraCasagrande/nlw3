/* AVISO -> UPLOAD NÃO ACEITA IMAGENS .png*/
import { Router } from "express" /* Importa o "fazedor de rotas" do express */
import multer from "multer" /* Importa biblioteca para lidar com o upload de arquivos */

import uploadConfig from "./config/upload" /* Importa as configurações de upload de aruivos */

/* Importa o controlador de fluxo de dados sobre os ofanatos */
import OrphanagesController from "./controllers/OrphanagesController" 

const routes = Router() /* Cria o roteador */
const upload = multer(uploadConfig) /* Prepara para receber arquivos de acordo com as configurações */

/* get esse endereço -> mostrar todos os orfanatos*/
routes.get("/orphanages", OrphanagesController.index) 

/* get esse endereço com id ->  mostrar informações de um orfanato específico*/
routes.get("/orphanages/:id", OrphanagesController.show)

/* post nesse endereço -> guarda as imagens enviadas -> cria um orfanato com os dados enviados, mais as imagens */
routes.post("/orphanages", upload.array("images"), OrphanagesController.create)

export default routes