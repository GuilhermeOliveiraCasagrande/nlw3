import { Router } from "express"
import OrphanagesController from "./controllers/OrphanagesController"

const routes = Router()
routes.post("/orphanages", (req, res) => OrphanagesController.createOrphanage(req, res))

export default routes