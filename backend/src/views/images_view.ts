import Image from "../models/Image";

/* Determina o que é retornado para a resposta */
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.18.34:3333/uploads/${image.path}` /* Retorna a url para baixar a imagem */
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}