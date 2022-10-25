import express from "express"
import cookieParser from "cookie-parser"
import session from 'express-session'

import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcrypt';

import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import {Server as HttpServer} from 'http'
import {Server as socket} from "socket.io";

import {normalize, schema} from "normalizr";

import {faker} from "@faker-js/faker";
faker.locale = 'es'

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

import {ProductoDao, UsuarioDao} from "./src/index.js";

app.set('views', './views')
app.set('view engine', 'pug')

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const usuarios = await UsuarioDao.listarAll()
        const usuario = usuarios.find(usr => usr.username == username)

        if (!usuario) {
            return done(null, false)
        } else {
            const match = await verifyPass(usuario, password)
            if ( !match ) {
                return done(null, false)
            }
            return done(null, usuario)
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.username)
})

passport.deserializeUser(async (nombre, done) => {
    const usuarios = await UsuarioDao.listarAll()
    const usuario = usuarios.find(usr => usr.username == nombre)
    done(null, usuario)
})

//Persistencia en mongo
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGODB,
    ttl: 60
})

app.use(session({
    store: MongoStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60 //20 seg
    },
    //rolling: true
}))

app.use(passport.initialize());
app.use(passport.session());

async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

async function verifyPass(username, password) {
    const match = await bcrypt.compare(password, username.password);
    console.log(`pass login: ${password} || pass hash: ${ username.password}`)
    return match;
}

function isAuth(req, res, next) {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/login')
    }
}

/*--------------------------------------------------------------------------------------------*/

app.get('/', async (req, res) => {
    res.redirect('/login')
})

app.get('/vista', isAuth, (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    if(!req.user.contador) {
        req.user.contador = 1
    } else {
        req.user.contador ++
    }
    const username = req.user.username
    console.log(username)
    if (req.user) {
        res.render('vista', {username})
    } else {
        res.redirect('/login')
    }
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


app.get('/login', (req, res) => {
    if(req.user) {
        res.redirect('/vista')
    } else {
        res.render('login')
    }
})

app.get('/error-login', (req, res) => {
    res.render('error-login')
})

app.get('/error-registro', (req, res) => {
    res.render('error-registro')
})

app.post('/login', passport.authenticate('local',  {successRedirect: '/vista', failureRedirect: '/error-login'} ));

app.get('/registro', (req, res) => {
    res.render('registro')
})

app.post('/registro', async (req, res) => {
    const {username, password} = req.body

    const usuarios = await UsuarioDao.listarAll()
    const usuario = usuarios.find(usr => usr.username == username)
    if (usuario) {
        res.redirect('/error-registro')
    } else {
        await UsuarioDao.guardar({username, password: await generateHashPassword(password)})
        res.redirect('/login')
    }

    console.log(usuarios)

})

//
// app.get('/privado', auth, (req, res) => {
//     res.send('Se encuentra loguado')
// })
//
app.get('/logout', (req, res) => {
    const username = req.session.username
    req.session.destroy(err => {
        if(err) {
            res.json({err})
        } else {
            res.render('login')
        }
    })

})

app.get('/logout_timeout', (req, res) => {
    res.render('logout_timeout', {})
})

/*---------------------------------------------------*/

app.post('/productos', async (req, res) => {
    try {
        await ProductoDao.guardar({...req.body})
        res.redirect('/vista')
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
