const express = require('express')
const morgan = require('morgan')
const { Router } = express

const app = express()
const routerProductos = require('./src/routes/productos.routes')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/api/productos', routerProductos)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', err => console.log(`Error en el servidor ${err}`))