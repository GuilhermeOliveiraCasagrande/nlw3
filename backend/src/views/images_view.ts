import Image from "../models/Image";
import ip from "ip"

/* Determina o que é retornado para a resposta */
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://${ip.address()}:3333/uploads/${image.path}` /* Retorna a url para baixar a imagem */
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}