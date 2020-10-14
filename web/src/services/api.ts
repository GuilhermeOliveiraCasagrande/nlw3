import axios from "axios"

export default axios.create({ /* Cria um fazedor de requests para esse endereço */
    baseURL: "http://localhost:3333/"
})