const express = require('express')
const routerProductos = express.Router()

const Contenedor = require('../../Contenedor.js')

const contenedor = new Contenedor("./productos.txt")

routerProductos.get('/', async (req, res) => {
    try {
        return res.status(200).json(await contenedor.getAll())
    } catch (error) {
        res.status(500).json({ code: 500, msg: error })
        throw new Error(`Error al listar los productos ${error}`)
    }
})

routerProductos.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await contenedor.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} no existe`})
        }
        return res.status(200).json(productos[indexObj])

    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/', async (req, res) => {
    try {
        const objetos = await contenedor.getAll()

        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            newId = objetos[objetos.length - 1].id + 1
        }

        const productos = await contenedor.getAll()
        await contenedor.save({id: newId, ...req.body})
        return res.status(201).json({code: 201, msg: "Nuevo producto agregado correctamente"})
    } catch (error) {
        console.log(error)
    }
})

routerProductos.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)        
        const {title, price, thumbnail} = req.body

        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await contenedor.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} no existe`})
        }

        await contenedor.updateById(id, {title, price, thumbnail})

        res.status(200).json({code: 200, msg: `Producto con id ${id} actualizado correctamente`})

    } catch (error) {
        console.log(error)
    }
})

routerProductos.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        if (isNaN(id)) {
            return res.status(404).json({code: 404, msg: "El parametro ingresado no es un numero"})
        }

        const productos = await contenedor.getAll(id)
        const indexObj = productos.findIndex((o) => o.id == id)

        if (indexObj == -1) {
            return res.status(404).json({code: 404, msg: `El producto solicitado con id ${id} ya no existe`})
        }
        
        await contenedor.deleteById(id)
        return res.status(200).json({code: 200, msg: "Producto eliminado correctamente"})
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('*', (req, res) => {
    res.status(404).json({code: 404, msg: "not found"})
})

module.exports = routerProductos    