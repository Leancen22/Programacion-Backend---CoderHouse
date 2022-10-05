import express from 'express'
import util from 'util'

import {Server as HttpServer} from 'http'
import {Server as socket} from "socket.io";

import {normalize, schema} from "normalizr";

import {faker} from "@faker-js/faker";
faker.locale = 'es'

const app = express()
const httpServer = new HttpServer(app)
const io = new socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

import ContenedorArchivo from './src/Containers/ContainerArchivo.js'
const mensajesApi = new ContenedorArchivo('./DB/mensajes.json')

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
    res.render('vista', {})
})

app.get('/api/productos-test', (req, res) => {
    const CANT_PROD = 5
    const productos = []
    for (let index = 1; index <= CANT_PROD; index ++) {
        const prod = {
            id: index,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: `${faker.image.imageUrl()}?${index}`
        }
        productos.push(prod)
    }
    console.log(productos)
    res.render('productos', {productos})
})

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'})
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, {idAttribute: 'id'})
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, {idAttribute: 'id'})

const normalizarMensaje = (mensajesConId) => normalize(mensajesConId, schemaMensajes)


io.on('connection', async (socket) => {
    console.log(`Un nuevo cliente se conecto ${socket.id}`)

    //const elem = await listarMensajesNormalizados()
    //console.log(util.inspect(elem, false, 12, true))

    socket.emit('mensajes', await listarMensajesNormalizados())
    //socket.emit('mensajes', await mensajesApi.listarAll())

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        console.log(mensaje)
        io.sockets.emit('mensajes', await listarMensajesNormalizados())
        //socket.emit('mensajes', await mensajesApi.listarAll())
    })
})

async function listarMensajesNormalizados() {
    const mensajes = await mensajesApi.listarAll()
    const normalizados = normalizarMensaje({id: 'mensajes', mensajes})
    return normalizados
}

const server = httpServer.listen(8000, () => {
    console.log('Runing in port 8000')
})
server.on('error', error => console.log('Error al levantar'))

