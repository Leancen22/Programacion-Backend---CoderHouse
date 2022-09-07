const express = require('express');
const Contenedor = require('../lib/Contenedor.js');
const productosRouter = express.Router();
const config = require('../utils/config')

const producto = new Contenedor("./productos.json");

const isAdministrator = config.administrator
function Administrator (req, res, next) {
    if (!isAdministrator) {
        res.status(403).json({error: -1, msg: `Ruta ${req.originalUrl}, metododo ${req.method} no autorizado`})
    } else {
        next()
    }
}

productosRouter.get('/', async (req, res) => {
    try {
        return res.status(200).json(await producto.getAll())
    } catch (error) {
        res.status(500).json({ code: 500, msg: error })
        throw new Error(`Error al listar los productos ${error}`)
    }
})

productosRouter.get('/:id', async (req, res, next) => {
    
    try {

        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await producto.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} no existe`})
        }
        return res.status(200).json(productos[indexObj])

    } catch (error) {
        console.log(error)
    }
})

productosRouter.post('/', Administrator, async (req, res) => {
    try {
        const objetos = await producto.getAll()

        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            newId = objetos[objetos.length - 1].id + 1
        }

        await producto.save({id: newId, ...req.body})

        const productos = await producto.getAll(newId)
        const indexObj = productos.findIndex((o) => o.id == newId)
        
        console.log(productos[indexObj])

        return res.status(201).json({code: 201, msg: "Nuevo producto agregado correctamente", producto: productos[indexObj]})

    } catch (error) {
        console.log(error)
    }
})

productosRouter.put('/:id', Administrator, async (req, res) => {
    try {

        const id = parseInt(req.params.id)        
        const {title, description, price, thumbnail, code, stock} = req.body

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await producto.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} no existe`})
        }

        await producto.updateById(id, {title, description, price, thumbnail, code, stock})

        res.status(200).json({code: 200, msg: `Producto con id ${id} actualizado correctamente`})

    } catch (error) {
        console.log(error)
    }
})

productosRouter.delete('/:id', Administrator, async (req, res) => {
    
    try {

        const id = parseInt(req.params.id)
        
        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await producto.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
        }
        
        await producto.deleteById(id)
        return res.status(200).json({code: 200, msg: "Producto eliminado correctamente"})
    
    } catch (error) {
        console.log(error)
    }
})

module.exports = productosRouter