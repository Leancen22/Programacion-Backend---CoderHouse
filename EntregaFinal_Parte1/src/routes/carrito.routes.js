const express = require('express');
const carritoRouter = express.Router();

const Contenedor = require('../lib/Contenedor')

const CarritoApi = new Contenedor('carrito.json')
const ProductoApi = new Contenedor('productos.json')


carritoRouter.get('/', async (req, res) => {
    try {
        res.status(200).json(await CarritoApi.getAll())
    } catch (error) {
        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al listar los carritos ${error}`)
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
    } catch (error) {

        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al borar el carrito con id: ${id}, ${error}`)
    }

    
})

carritoRouter.get('/:id/productos', async (req, res) => {

    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const carro = await CarritoApi.getAll(id)
        const indexObj = carro.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
        }

        const Carrito = await CarritoApi.getById(parseInt(req.params.id))
        res.json(Carrito.productos)

    } catch (error) {
        res.status(500).json({code: 500, error: error})
        throw new Error(`Error al obtener los productos del carrito con id: ${id}, ${error}`)
    }

})

carritoRouter.post('/:id/productos', async (req, res) => {

    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const carro = await CarritoApi.getAll(id)
        const indexObj = carro.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
        }

        const Carrito = await CarritoApi.getById(parseInt(req.params.id))
        
        const producto = await ProductoApi.getAll(parseInt(req.params.id))
        const indexProd = producto.findIndex(i => i.id == parseInt(req.body.id))

        if (indexProd == -1) {
            res.status(404).json({code: 404, msg: `Error al agregar el producto solicitado, no existe`})
        } else {
            Carrito.productos.push(producto[indexProd])
            await CarritoApi.updateById(parseInt(req.params.id), Carrito)
            res.status(200).json({code: 200, msg: "Nuevo producto agregado correctamente"})
        }

        res.end()

    } catch (error) {
        res.status(500).json({code: 500, msg: error})
        throw new Error(`Error al agregar nuevos productos ${error}`)
    }

    
})

carritoRouter.delete('/:id/productos/:idProd', async (req, res) => {

    try {
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
        
    } catch (error) {
        res.status(500).json({code: 500, msg: error})
        throw new Error(`${error}`)
    }
    
})

module.exports = carritoRouter