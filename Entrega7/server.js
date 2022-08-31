const express = require('express')
const morgan = require('morgan')

const path = require('path')
const exphbs = require('express-handlebars')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./Contenedor.js')
const Mensaje = require('./Mensajes.js')

const contenedor = new Contenedor('./productos.txt')
const mensaje = new Mensaje('./mensajes.txt')

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('vista', {})
})

app.post('/productos', async (req, res) => {
    try {
        const objetos = await contenedor.getAll()

        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            newId = objetos[objetos.length - 1].id + 1
        }

        await contenedor.save({id: newId, ...req.body})

        const productos = await contenedor.getAll(newId)
        const indexObj = productos.findIndex((o) => o.id == newId)
        
        console.log(productos[indexObj])

        //return res.status(201).json({code: 201, msg: "Nuevo producto agregado correctamente", producto: productos[indexObj]})
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

app.post('/mensajes', async (req, res) => {
    try {
        const mensajes = await mensaje.getAll()

        await mensaje.save({...req.body})
        console.log(req.body)
        console.log(mensajes)

        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

const PORT = 8081
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
server.on('Error', err => console.log(`Ha ocurrido un error en el servidor ${err}`))

io.on('connection', async (socket) => {
    console.log(`Un nuevo cliente se conecto ${socket.id}`)

    const mensajes = await mensaje.getAll()
    io.sockets.emit('from-server-mensajes', mensajes)

    const productos = await contenedor.getAll()
    io.sockets.emit('from-server-productos', productos)

    socket.on('from-client-mensaje', mensaje => {
        mensajes.push(mensaje)
        io.sockets.emit('from-server-mensajes', mensajes)
    })

    socket.on('from-client-producto', producto => {
        productos.push(producto)
        io.sockets.emit('from-server-productos', productos)
    })
    
})