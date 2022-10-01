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
            res.status(200).json(await CarritoDao.listar(req.params.id))
        } else {
            res.status(404).json('No se escontro test')
        }

        console.log(await CarritoDao.listar(req.params.id))
    }catch (e) {
        res.status(404).json({code: 404, msg: 'No se encontro'})
    }
})

carritosRouter.post('/', async (req, res) => {
    await CarritoDao.guardar({productos: []})
    //await CarritoDao.guardar()
    console.log(req.body)
    res.status(201).json({code: 201, msg: 'Nuevo producto agregado'})
})

carritosRouter.delete('/:id', async (req, res) => {
    await CarritoDao.borrar(req.params.id)
    res.status(200).json({code: 200, msg: 'Eliminado correctamente'})
})

carritosRouter.get('/:id/productos', async (req, res) => {
    try {
        const carrito = await CarritoDao.listar(req.params.id)
        res.status(200).json({code: 200, msg: carrito.productos})

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
        res.status(403).json({code: 403, msg: 'No se encontro'})
    }
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await CarritoDao.listar(req.params.id)
    const producto = await ProductoDao.listar(req.body.id)
    console.log(carrito, carrito.productos, producto)
    carrito.productos.push(producto)
    await CarritoDao.actualizar(req.params.id ,carrito)
    res.json('Nuevo producto agregado')
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    let carrito = await CarritoDao.listar(req.params.id)
    let index = carrito.productos.findIndex(obj => (obj._id || obj.id) == req.params.idProd)
    console.log(carrito, index, carrito.productos)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await CarritoDao.actualizar(req.params.id ,carrito)
        res.status(200).json({code: 200, msg: 'Borrado correctamente'})
    } else {
        res.status(404).json({code: 404, msg: 'No encontrado'})
    }
})

export default carritosRouter