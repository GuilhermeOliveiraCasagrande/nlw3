import axios from "axios"
/* INICIA O COMPUTADOR -> IP ALTERA */
export default axios.create({
    baseURL: "http://192.168.18.34:3333/", /* Acessar o ip pela maquina */
})