import express from "express"
import session from 'express-session'
import compression from "compression"
import cluster from "cluster"
import os from 'os'
import parseArgs from 'minimist';
import { fork } from "child_process"
import bcrypt from 'bcrypt';
import {normalize} from "normalizr";
import nodemailer from 'nodemailer'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"

import dotenv from 'dotenv'
dotenv.config()

import {faker} from "@faker-js/faker";
faker.locale = 'es'

import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import {Server as HttpServer} from 'http'
import {Server as socket} from "socket.io";


const app = express()
const httpServer = new HttpServer(app)
const io = new socket(httpServer)

import { logger, Ruta, NoImplementada } from "./utils/logger.config.js"
import processRouter from './src/routers/process.router.js'
import testProductos from "./src/routers/test_productos.router.js"

//import ContenedorArchivo from './src/Containers/ContainerArchivo.js'
import UsuariosDaosMongo from "./src/daos/Usuarios/UsuariosDaosMongo.js"
let api_usuario = UsuariosDaosMongo.getInstance()

import productosRouter from "./src/routers/productos.router.js"
import carritosRouter from "./src/routers/carrito.router.js"
import indexRouter from "./src/routers/indexRouter.js"

import { loginPassport } from "./utils/passport.js"

import {centro_mensajes} from "./utils/Mensajeria/mensajes_chat.js"


// GraphQL
import { graphqlHTTP } from 'express-graphql'
import { listar_productos, listar_producto, borrar_producto, actualizar_producto, guardar_producto } from "./src/graphql/resolvers.js"
import productosSchema from "./src/graphql/schema.js"


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(compression())
app.use(bodyParser.json());

//const mensajesApi = new ContenedorArchivo('./DB/mensajes.json')

app.set('views', './views')
app.set('view engine', 'pug')

passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        await loginPassport(username, password, done)
    })
);

passport.serializeUser((usuario, done) => {
    done(null, usuario.username)
})

passport.deserializeUser(async (nombre, done) => {
    const usuarios = await api_usuario.listarAll()
    const usuario = usuarios.find(usr => usr.username == nombre)
    done(null, usuario)
})

//Persistencia en mongo
// mongoose.connect(
//     process.env.MONGO_ATLAS, 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// )

app.use(cookieParser()) 
app.use(session({   
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    // cookie: {
    //     httpOnly: false,
    //     secure: false
    // },
    //rolling: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter)
app.use('/process', processRouter)
app.use('/api/productos_test', testProductos)

//esta ruta se prueba desde /productos/_graphql
app.use('/productos', graphqlHTTP({
    schema: productosSchema,
    rootValue: {
        listar_productos,
        listar_producto,
        borrar_producto,
        actualizar_producto,
        guardar_producto
    },
    graphiql: true,
}))
//app.use('/productos', productosRouter)


app.use('/carrito', carritosRouter)

/*--------------------------------------------------------------------------------------------*/

//Ruta para excepciones
app.get('*', (req, res) => {
    //let ruta = req.url
    // logger.warn(`Ruta ${ruta} con metodo ${req.method} no implementada`)
    NoImplementada(req)
    res.send('ruta no implementada')
})

await centro_mensajes(io)

const options = { default: { port: 8080, modo: 'fork' }, alias: { p: "port" } };
const args = parseArgs(process.argv.slice(2), options);

const CPU_CORES = os.cpus().length
const PORT = process.env.PORT || 7080
//process.env.PORT || 5000 args.port || process.env.PORT

if ((args.modo == "cluster") && (cluster.isPrimary)) {

    for (let index = 0; index < CPU_CORES; index++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log(`Worker ${process.pid} finished`)
        cluster.fork()
    })

} else {
    const server = httpServer.listen(PORT, () => {
        logger.info(`Runing in port ${PORT} ${process.pid}`)
    })
    server.on('error', error => logger.error(`Error al levantar ${error}`))
}
