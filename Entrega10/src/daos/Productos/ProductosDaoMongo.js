import ContenedorMongo from '../../Containers/ContenedorMongo.js'

class ProductosDaoMongo extends ContenedorMongo {
    constructor () {
        super('personas', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }    
}

export default ProductosDaoMongo