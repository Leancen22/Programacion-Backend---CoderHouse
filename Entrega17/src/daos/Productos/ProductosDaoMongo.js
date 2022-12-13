import ContainerMongo from "../../Containers/ContainerMongo.js";

class ProductosDaoMongo extends ContainerMongo {
    constructor(nombreColeccion, esquema) {
        super('productos', {
            title: {type: String, required: true},
            price: {type: Number, required: true},
            categoria: {type: String, required: true},
            thumbnail: {type: String, required: true},
        });
    }

    async listarPorCategoria(categoria) {
        try {
          return await this.collecion.find(categoria);
        } catch (error) {
          logError(error);
        }
    }
}

export default ProductosDaoMongo