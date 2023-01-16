import { application } from 'express'
import Koa from 'koa'
import {koaBody} from 'koa-body'

import productosRouter from './src/routers/productos.router.js'

const app = new Koa()

app.use(koaBody())

app.use(productosRouter.routes())

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor con Koa`)
})
server.on('error', error => console.log(error))

