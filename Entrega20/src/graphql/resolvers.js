import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"

let productosApi = ProductosDaoMongo.getInstance()

export async function listar_productos () {
    return await productosApi.listarAll()
}

export async function listar_producto (id) {
    return await productosApi.listar(id)
}

export async function borrar_producto (id) {
    return await productosApi.borrar(id)
}

export async function actualizar_producto (id, datos) {
    return await productosApi.actualizar(id, datos)
}

export async function guardar_producto (datos) {
    return await productosApi.guardar(datos)
}