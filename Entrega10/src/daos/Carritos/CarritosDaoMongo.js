import ContenedorMongo from '../../Containers/ContenedorMongo.js'

class CarritosDaoMongo extends ContenedorMongo {
    constructor () {
        super('carritos', {
            productos: { type: [], required: true}
        })
    }    

    async save(carrito = {productos: []}){
        return super.save(carrito)
    }
}

export default CarritosDaoMongo