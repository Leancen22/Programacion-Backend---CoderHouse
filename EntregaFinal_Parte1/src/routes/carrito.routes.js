const express = require('express');
const carritoRouter = express.Router();

const Contenedor = require('../lib/Contenedor')

const carrito = new Contenedor('carrito.json')
const producto = new Contenedor('productos.txt')

carritoRouter.get('/', async (req, res) => {
    res.json(await carrito.getAll())
})

carritoRouter.post('/', async (req, res) => {
    res.json({id: await carrito.save({ productos: [] })})
})

carritoRouter.delete('/:id', async (req, res) => {
    res.json(await carrito.deleteById(parseInt(req.params.id)))
})

carritoRouter.get('/:id/productos', async (req, res) => {
    const idCarrito = await carrito.getById(parseInt(req.params.id))
    res.json(idCarrito.productos)
})

carritoRouter.post('/:id/productos', async (req, res) => {
    const idCarrito = await carrito.getById(parseInt(req.params.id))
    const idProducto = await producto.getById(parseInt(req.body.id))
    idCarrito.productos.push(idProducto)
    await carrito.updateById(parseInt(req.params.id), idCarrito)
    res.end()
})

carritoRouter.delete(':id/productos/:idProd', async (req, res) => {
    const idCarrito = await carrito.getById(parseInt(req.params.id))
    const index = idCarrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        idCarrito.producto.slice(index, 1)
        await idCarrito.updateById(parseInt(req.params.id), idCarrito)
    }
    res.end()
})

module.exports = carritoRouter