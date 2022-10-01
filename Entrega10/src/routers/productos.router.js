import express from 'express'
const productosRouter = express.Router()

import {CarritoDao, ProductoDao} from '../index.js'

productosRouter.get('/', async (req, res) => {
    res.status(200).json(await ProductoDao.listarAll())
})

productosRouter.get('/:id', async (req, res) => {
    try {
        const productos = await ProductoDao.listarAll()
        const index = productos.findIndex(o => (o.id || o._id) == req.params.id)

        if (index != -1) {
            res.json(await ProductoDao.listar(req.params.id))
        } else {
            res.send('No se escontro el producto solicitado')
        }

    }catch (e) {
        res.json({code: 500, msg: `Error al obtener por id: ${e}`})
    }
})

productosRouter.post('/', async (req, res) => {
    await ProductoDao.guardar({...req.body})
    console.log(req.body)
    res.status(201).json({code: 201, msg: 'Nuevo producto agregado'})
})

productosRouter.put('/:id', async (req, res) => {
    try {
        await ProductoDao.actualizar(req.params.id, {...req.body})
        res.status(200).json({code: 200, msg: 'Actualizado'})
    } catch (e) {
        res.status(404).json({code: 404, msg: `Error ${e}`})
    }
})

productosRouter.delete('/:id', async (req, res) => {
    await ProductoDao.borrar(req.params.id)
    res.status(200).json({code: 200, msg: "Producto borrado exitosamente"})
})

productosRouter.delete('/', async (req, res) => {
    res.status(200).json(await ProductoDao.borrarAll())
})

export default productosRouter