import ContenedorMongo from '../../Containers/ContenedorMongo.js'

class CarritosDaoMongo extends ContenedorMongo {
    constructor () {
        super('carritos', {
            productos: { type: [], required: true}
        })
    }    

    async save(carrito = {productos: []}) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongo