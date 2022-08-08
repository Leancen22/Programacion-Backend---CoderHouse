const express = require('express')
const Contenedor = require('./Contenedor.js')

const app = express()
const contenedor = new Contenedor("./productos.txt")

app.get('/productos', async (req, res) => {
    res.send(await contenedor.getAll())
})

app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll()
    let numeroAleatorio = parseInt(Math.random() * productos.length)
    res.send(productos[numeroAleatorio])
})

const server = app.listen('8081', () => {
    console.log('Servidor corriendo en puerto 8081')
})