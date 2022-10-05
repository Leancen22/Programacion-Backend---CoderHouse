import ContainerFirebase from "../../Containers/ContainerFirebase.js";

class CarritosDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carritos');
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoFirebase