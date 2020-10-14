import { ErrorRequestHandler } from "express"
import { ValidationError } from "yup"

interface ValidationErrors {
    /* chave string : valor array de strings */
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error)/* Mostra o problema no console */
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}
        error.inner.forEach(err => {
            /* atributo do caminho do erro tem o valor dos erros dados*/
            errors[err.path] = err.errors
        })

        /* Devolve pro usuário a mensagem de erro com os erros */
        return res.status(400).json({ message: "Validation fails", errors })
    }
    /* Mas devolve pro usuário uma mensagem de erro */
    return res.status(500).json({ message: "Internal server error" })
}
export default errorHandler