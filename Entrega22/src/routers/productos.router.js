import Router from "koa-router"
const productosRouter = new Router({
    prefix: '/productos'
})

//import { guardar_producto, listar_categoria, borrar_producto, borrar_productos } from "../Controllers/productos.controller.js"
import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"
let api = ProductosDaoMongo.getInstance()

productosRouter.get('/', async (ctx) => {
    let datos = await api.listarAll()
    ctx.body = {
        status: 'success', 
        message: datos
    }
})

productosRouter.post('/', async (ctx) => {
    await api.guardar({...ctx.request.body})
    ctx.response.status = 201
    ctx.body = {
        status: 'success', 
        message: 'Dato agregado'
    }
})

// productosRouter.post('/productos_categoria', listar_categoria)

// productosRouter.delete('/:id', borrar_producto)

// productosRouter.delete('/', borrar_productos)

export default productosRouter