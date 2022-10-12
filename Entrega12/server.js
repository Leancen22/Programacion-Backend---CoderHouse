import express from "express"
import cookieParser from "cookie-parser"
import session from 'express-session'

import {Server as HttpServer} from 'http'
import {Server as socket} from "socket.io";

import {normalize, schema} from "normalizr";

import {faker} from "@faker-js/faker";
faker.locale = 'es'

import dotenv from 'dotenv'
dotenv.config()

import FileStoreLib from 'session-file-store'
const FileStore = FileStoreLib(session)

const app = express()
const httpServer = new HttpServer(app)
const io = new socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser(`${process.env.SECRET}`))

import ContenedorArchivo from './src/Containers/ContainerArchivo.js'
const mensajesApi = new ContenedorArchivo('./DB/mensajes.json')

import {ProductoDao} from "./src/index.js";

app.set('views', './views')
app.set('view engine', 'pug')

//Persistencia en mongo
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_ATLAS,
    ttl: 60
})

app.use(session({
    store: MongoStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*600},
    rolling: true
}))

function auth(req, res, next) {
    if(req.session.nombre) {
        return next()
    }
    return res.status(401).send('Forbbiden access')
}

app.get('/', auth, async (req, res) => {
    let nombre = req.session.nombre
    res.render('vista', {nombre})
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

/*---------------------------------------------------*/

// let contador = 0
// app.get('/sinSession', (req, res) => {
//     res.json({contador: contador++})
// })

app.get('/login', (req, res) => {
    // const {username, password} = req.query
    // if(username !== 'pepe' || password != 'pepepass'){
    //     return res.send('Login failed')
    // }
    // req.session.user = username
    // req.session.admin = true
    res.render('login')
})

app.post('/login_user', (req, res) => {
    const {nombre} = req.body
    if (!req.session.nombre) {
        req.session.nombre = nombre
    }
    res.redirect('/')
})
//
// app.get('/privado', auth, (req, res) => {
//     res.send('Se encuentra loguado')
// })
//
app.get('/logout', (req, res) => {
    const nombre = req.session.nombre
    req.session.destroy(err => {
        if(err) {
            res.json({err})
        } else {
            res.render('logout', {nombre})
        }
    })

})

app.get('/logout_timeout', (req, res) => {
    if(req.session.ttl == 0) {
        res.render('logout_timeout', {})
    }
})


// app.get('/conSession', (req, res) => {
//     if(!req.session.contador) {
//         req.session.contador ++
//         res.send("Bienvenido primer login")
//     } else {
//         req.session.contador ++
//         res.send(`Usted ha ingredado ${req.session.contador} veces`)
//     }
// })
//
// app.get('/setCookie', (req, res) => {
//     res.cookie('normalCookie', 'valorCookieNueva123').send(`Cookie guardada`)
// })
//
// app.get('/setCookieFirmada', (req, res) => {
//     res.cookie('signedCookie', 'valorCookieNueva123', {signed: true}).send(`Cookie guardada`)
// })
//
// app.get('/setCookieVolatil', (req, res) => {
//     res.cookie('CookieVolatil', 'CookieNueva987', {maxAge: 10000}).send(`Cookie guardada`)
// })
//
// app.get('/getCookies', (req, res) => {
//     res.send({cookies: req.cookies, signedCookies: req.signedCookies})
// })
//
// app.get('/clrCookie/:cookieName', (req, res) => {
//     res.clearCookie(req.params.cookieName).send('Cookie eliminada')
// })

/*---------------------------------------------------*/

app.post('/productos', async (req, res) => {
    try {
        await ProductoDao.guardar({...req.body})
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'})
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, {idAttribute: 'id'})
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, {idAttribute: 'id'})

const normalizarMensaje = (mensajesConId) => normalize(mensajesConId, schemaMensajes)


io.on('connection', async (socket) => {
    console.log(`Un nuevo cliente se conecto ${socket.id}`)

    //const elem = await listarMensajesNormalizados()
    //console.log(util.inspect(elem, false, 12, true))

    io.sockets.emit('mensajes', await listarMensajesNormalizados())
    //socket.emit('mensajes', await mensajesApi.listarAll())

    const productos = await ProductoDao.listarAll()
    io.sockets.emit('from-server-productos', productos)

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        console.log(mensaje)
        io.sockets.emit('mensajes', await listarMensajesNormalizados())
        //socket.emit('mensajes', await mensajesApi.listarAll())
    })

    socket.on('from-client-producto', producto => {
        productos.push(producto)
        io.sockets.emit('from-server-productos', productos)
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
