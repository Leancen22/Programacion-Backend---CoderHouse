import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"

let productosApi = ProductosDaoMongo.getInstance()

export async function listar_productos () {
    return await productosApi.listarAll()
}