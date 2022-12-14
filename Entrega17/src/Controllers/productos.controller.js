import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"
import { logger, Ruta } from "../../utils/logger.config.js"

let api = ProductosDaoMongo.getInstance()

export const guardar_producto = async (req, res) => {
    try {
        Ruta(req)
        await api.guardar({...req.body})
        res.redirect('/vista')
    } catch (error) {
        logger.error(`Ha ocurrido un error ${error}`)
    }
}

export const listar_categoria = async (req, res) => {
    const {categoria} = req.body
    
    const productos = await api.listarAllObj(categoria)

    const productos_especificos = productos.filter(prod => prod.categoria == categoria)

    if (productos_especificos != null) {
        res.json(productos_especificos)
    } else {
        res.send('No hay productos con esa categoria')
    }

}