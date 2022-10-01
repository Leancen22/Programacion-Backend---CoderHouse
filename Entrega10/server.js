import express from 'express'
import productosRouter from "./src/routers/productos.router.js";
import carritosRouter from "./src/routers/carritos.router.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

const server = app.listen(8000, () => {
    console.log('Server run in port 8000')
})