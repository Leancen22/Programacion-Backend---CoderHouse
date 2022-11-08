import ContainerArchivo from "../../Containers/ContainerArchivo.js";

class CarritosDaoArchivo extends ContainerArchivo {
    constructor(archivo) {
        super('./DB/carritos.json');
    }
}

export default CarritosDaoArchivo