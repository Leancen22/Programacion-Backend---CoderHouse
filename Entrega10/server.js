import express from 'express'
import path from 'path'
const {Router} = express

const app = express()
import productosRouter from './src/routes/productos.routes.js'
import carritoRouter from './src/routes/carrito.routes.js'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

const PORT = 8081
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
server.on('Error', err => console.log(`Ha ocurrido un error en el servidor ${err}`))
