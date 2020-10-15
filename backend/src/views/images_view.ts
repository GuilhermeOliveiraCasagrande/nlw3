import Image from "../models/Image";

/* Determina o que é retornado para a respost */
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:3000/uploads/${image.path}` /* Retorna a url para baixar a imagem */
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}