const express = require('express');
const productosRouter = express.Router();

const Producto = require("../lib/Productos.js");

const producto = new Producto("./productos.txt");

const administrator = true;

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

        // if (administrator) {
        //     next()
        // } else {
        //     res.status(404).json({error: 404, msg: "No deberias estar aqui"})
        // }
        if (administrator) {

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
        } else {
            res.status(404).json({error: -1, msg: `ruta ${req.originalUrl}, method ${req.method} no autorizado`})
        }

    } catch (error) {
        console.log(error)
    }
})

productosRouter.post('/', async (req, res) => {
    try {

        if (administrator) {

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
        
        } else {
            res.status(404).json({error: -1, msg: `ruta ${req.originalUrl}, method ${req.method} no autorizado`})
        }

    } catch (error) {
        console.log(error)
    }
})

productosRouter.put('/:id', async (req, res) => {
    try {

        if (administrator) {

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

        } else {
            res.status(404).json({error: -1, msg: `ruta ${req.originalUrl}, method ${req.method} no autorizado`})
        }

    } catch (error) {
        console.log(error)
    }
})

productosRouter.delete('/:id', async (req, res) => {
    try {

        if (administrator) {

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
            
        } else {
            res.status(404).json({error: -1, msg: `ruta ${req.originalUrl}, method ${req.method} no autorizado`})
        }
    
    } catch (error) {
        console.log(error)
    }
})

module.exports = productosRouter