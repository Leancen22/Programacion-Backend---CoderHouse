import ContainerMongo from "../../Containers/ContainerMongo.js";

class CarritosDaoMongo extends ContainerMongo {
    constructor() {
        super('carritos', {
            productos: {type: [], required: true}
        });
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }

}

export default CarritosDaoMongo