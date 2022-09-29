import ContenedorArchivo from "../../Containers/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(archivo) {
        super('./carrito.json')
    }
}

export default CarritosDaoArchivo