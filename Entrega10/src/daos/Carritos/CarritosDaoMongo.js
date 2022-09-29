import ContenedorMongo from '../../Containers/ContenedorMongo.js'

class CarritosDaoMongo extends ContenedorMongo {
    constructor () {
        super('carritos', {
            productos: { type: [], required: true}
        })
    }
}

export default CarritosDaoMongo