import express from 'express'
const carritosRouter = express.Router()

import {CarritoDao, ProductoDao} from "../index.js";

carritosRouter.get('/', async (req, res) => {
    res.status(200).json(await CarritoDao.listarAll())
})

carritosRouter.get('/:id', async (req, res) => {
    try {
        const carro = await CarritoDao.listarAll()
        const index = carro.findIndex(o => (o.id || o._id) == req.params.id)

        if (index != -1) {
            res.json(await CarritoDao.listar(req.params.id))
        } else {
            res.send('No se escontro')
        }

    }catch (e) {
        res.json({code: 500, msg: `Error al obtener por id: ${e}`})
    }
})

carritosRouter.post('/', async (req, res) => {
    await CarritoDao.guardar({productos: []})
    //await CarritoDao.guardar()
    console.log(req.body)
    res.json({code: 201, msg: 'Nuevo producto agregado'})
})

carritosRouter.delete('/:id', async (req, res) => {
    await CarritoDao.borrar(req.params.id)
    res.json({code: 200, msg: 'Eliminado correctamente'})
})

carritosRouter.get('/:id/productos', async (req, res) => {
    try {
        const carrito = await CarritoDao.listar(req.params.id)
        res.json({code: 200, msg: carrito.productos})

        // const carro = await CarritoDao.listar(req.params.id)
        // const indexObj = carro.findIndex((o) => o.id == req.params.id)
        //
        // if (indexObj == -1) {
        //     return res.status(404).json({code: 404, msg: `El producto solicitado con id ${req.params.id} ya no existe`})
        // }
        //
        // const Carrito = await CarritoDao.listar(req.params.id)
        // res.json(Carrito.productos)
    }catch (e) {
        res.json({code: 500, msg: `Error ${e}`})
    }
})

carritosRouter.post('/:id/productos', async (req, res) => {
    try {
        const carrito = await CarritoDao.listar(req.params.id)
        const producto = await ProductoDao.listar(req.body.id)
        if (producto == null) {
            res.json({code: 404, msg: 'El producto solicitado no existe'})
        } else {
            carrito.productos.push(producto)
            await CarritoDao.actualizar(req.params.id ,carrito)
            res.send('Nuevo producto agregado')
            res.end()
        }
    } catch (error) {
        res.json({code: 500, msg: `Error al agregar producto al carrito ${error}`})
    }
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    try {
        let carrito = await CarritoDao.listar(req.params.id)
        let index = carrito.productos.findIndex(obj => (obj._id || obj.id) == req.params.idProd)
        console.log(carrito, index, carrito.productos)
        if (index != -1) {
            carrito.productos.splice(index, 1)
            await CarritoDao.actualizar(req.params.id ,carrito)
            res.json({code: 200, msg: 'Borrado correctamente'})
        } else {
            res.json({code: 404, msg: 'No encontrado'})
        }
    } catch (error) {
        res.json({code: 500, msg: `Error al agregar producto al carrito ${error}`})
    }
    
})

export default carritosRouter