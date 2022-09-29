import express from 'express'
const carritoRouter = express.Router();

import config from '../config.js'

import {DaoCarrito as CarritoApi} from '../daos/index.js'
import {DaoProducto as ProductoApi} from '../daos/index.js'

carritoRouter.get('/', async (req, res) => {
    try {
        res.json(await CarritoApi.getAll())
    } catch (error) {
        res.status(500).json({ code: 500, msg: error })
        throw new Error(`Error al listar los productos ${error}`)
    }
})

carritoRouter.post('/', async (req, res) => {
    
    try {
        res.status(201).json({id: await CarritoApi.save({ productos: [] })})
    } catch (error) {

        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al listar los carritos ${error}`)
    }
})

carritoRouter.delete('/:id', async (req, res) => {

    try {

        if (config.MODO_PERSISTENCIA == 'firebase') {

            const carro = await CarritoApi.getAll(req.params.id)
            const indexObj = carro.findIndex((o) => o.id == req.params.id)

            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${req.params.id} ya no existe`})
            }

            await CarritoApi.deleteById(req.params.id)
            res.status(200).json({code: 200, msg: `Se ha eliminado el carrito correctamente`})
        } else {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
            }

            const carro = await CarritoApi.getAll(id)
            const indexObj = carro.findIndex((o) => o.id == id)

            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
            }

            await CarritoApi.deleteById(parseInt(req.params.id))
            res.status(200).json({code: 200, msg: `Se ha eliminado el carrito correctamente`})
        }
    } catch (error) {

        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al borar el carrito con id: ${id}, ${error}`)
    }

    
})

carritoRouter.get('/:id/productos', async (req, res) => {

    try {

        if (config.MODO_PERSISTENCIA == 'firebase') {
            //const id = parseInt(req.params.id)

            //if (isNaN(id)) {
            //    return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
            //}

            const carro = await CarritoApi.getAll(req.params.id)
            const indexObj = carro.findIndex((o) => o.id == req.params.id)

            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
            }

            const Carrito = await CarritoApi.getById(req.params.id)
            res.json(Carrito.productos)
        } else {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
            }

            const carro = await CarritoApi.getAll(parseInt(req.params.id))
            const indexObj = carro.findIndex((o) => o.id == req.params.id)

            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
            }

            const Carrito = await CarritoApi.getById(req.params.id)
            res.json(Carrito.productos)
        }

    } catch (error) {
        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al obtener los productos del carrito con id: ${id}, ${error}`)
    }

})

carritoRouter.post('/:id/productos', async (req, res) => {

    if (config.MODO_PERSISTENCIA == 'firebase') {
        const carrito = await CarritoApi.getById(req.params.id)
        const producto = await ProductoApi.getById(req.body.id)

        carrito.productos.push(producto)
        await CarritoApi.updateById(req.params.id, carrito)
        res.end()
    } else {
        const carrito = await CarritoApi.getById(parseInt(req.params.id))
        const producto = await ProductoApi.getById(req.body.id)

        carrito.productos.push(producto)
        await CarritoApi.updateById(parseInt(req.params.id), carrito)
        res.end()
    }
})

carritoRouter.delete('/:id/productos/:idProd', async (req, res) => {

    try {

        if (config.MODO_PERSISTENCIA == 'firebase') {
            const Carrito = await CarritoApi.getById(req.params.id)
            const index = Carrito.productos.findIndex(p => p.id == req.params.idProd)
            if (index != -1) {
                Carrito.productos.splice(index, 1)
                await CarritoApi.updateById(req.params.id, Carrito)
                res.status(200).json({code: 200, msg: `Producto con id ${req.params.idProd} eliminado correctamente`})
                res.end()
            } else {
                res.status(404).json({code: 404, msg: `El producto que se desea eliminar no existe`})
            }
        } else {
            const Carrito = await CarritoApi.getById(parseInt(req.params.id))
            const index = Carrito.productos.findIndex(p => p.id == req.params.idProd)
            if (index != -1) {
                Carrito.productos.splice(index, 1)
                await CarritoApi.updateById(parseInt(req.params.id), Carrito)
                res.status(200).json({code: 200, msg: `Producto con id ${req.params.idProd} eliminado correctamente`})
                res.end()
            } else {
                res.status(404).json({code: 404, msg: `El producto que se desea eliminar no existe`})
            }
        }
        
    } catch (error) {
        res.status(500).json({code: 500, msg: error})
        throw new Error(`${error}`)
    }
    
})

export default carritoRouter