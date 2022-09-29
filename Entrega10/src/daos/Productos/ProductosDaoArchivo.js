import ContenedorArchivo from "../../Containers/ContenedorArchivo.js"

class ProductoDaoArchivo extends ContenedorArchivo {
    constructor(archivo) {
        super('./productos.json')
    }
}

export default ProductoDaoArchivo