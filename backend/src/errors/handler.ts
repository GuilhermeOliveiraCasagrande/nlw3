import { ErrorRequestHandler } from "express"
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error)/* Mostra o problema no console */

    /* Mas devolve pro usuário uma mensagem de erro */
    return response.status(500).json({ message: "Internal server error" })
}
export default errorHandler