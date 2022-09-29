import express from 'express';
const productosRouter = express.Router();

import config from '../config.js';

import { DaoProducto as producto } from '../daos/index.js';

const isAdministrator = config.config.administrator
function Administrator (req, res, next) {
    if (!isAdministrator) {
        res.status(403).json({error: -1, msg: `Ruta ${req.originalUrl}, metododo ${req.method} no autorizado`})
    } else {
        next()
    }
}

productosRouter.get('/', async (req, res) => {
    try {
        return res.json(await producto.getAll())
    } catch (error) {
        res.status(500).json({ code: 500, msg: error })
        throw new Error(`Error al listar los productos ${error}`)
    }
})

productosRouter.get('/:id', async (req, res) => {
    
    try {
        if(config.MODO_PERSISTENCIA == 'firebase' || config.MODO_PERSISTENCIA == 'mongo') {

            const productos = await producto.getById(req.params.id);
            res.json(productos);
            console.log(productos)

        } else {
            const productos = await producto.getAll(req.params.id)
            const indexObj = productos.findIndex((o) => o.id == req.params.id)

            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${req.params.id} no existe`})
            }
            return res.status(200).json(productos[indexObj])
        }
    } catch (error) {
        console.log(error)
    }

})

productosRouter.post('/', Administrator, async (req, res) => {
    try {

        if (config.MODO_PERSISTENCIA == 'mongo') {

            await producto.save(req.body)

            return res.status(201).json({code: 201, msg: "Nuevo producto agregado correctamente"})
        } else {
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
        }

    } catch (error) {
        console.log(error)
    }
})

productosRouter.put('/:id', Administrator, async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const prodActualizado = await producto.updateById(id, data);
        res.json({code: 200, msg: "Producto actualizado correctamente"})
        console.log(id, data)
    } catch (error) {
        res.status(404).json({code: 404, msg: "No encontrado"})
    }
    
})

productosRouter.delete('/:id', Administrator, async (req, res) => {
    
    try {
        
        if(config.MODO_PERSISTENCIA == 'firebase') {
            const { id } = req.params;
            const prodEliminado = await producto.deleteById(id);
            res.status(200).json({code: 200, msg: 'producto eliminado con exito'})
        } else if (config.MODO_PERSISTENCIA == 'json') {
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
    
        }else {
            const productos = await producto.getAll(req.params.id)
            const indexObj = productos.findIndex((o) => o.id == req.params.id)
    
            if (indexObj == -1) {
                return res.status(404).json({code: 404, msg: `El producto solicitado con id ${req.params.id} ya no existe`})
            }
            
            await producto.deleteById(req.params.id)
            return res.status(200).json({code: 200, msg: "Producto eliminado correctamente"})
        }
    
    } catch (error) {
        console.log(error)
    }
    
    
})

export default productosRouter