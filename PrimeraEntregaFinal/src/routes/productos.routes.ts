import express from "express";
const routerProductos = express.Router();

routerProductos.get('/', (req, res) => {
    res.status(200).json({code: 200, msg: "Test"})
})

module.exports = routerProductos;