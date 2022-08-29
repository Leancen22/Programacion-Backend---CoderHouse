const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./Contenedor.js')

const contenedor = new Contenedor("./productos.txt")

//Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(express.static('public'))

//Motor de plantillas

// app.set('views', path.join(__dirname, 'views'))
// app.engine('hbs', exphbs.engine({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials')
// }))
// app.set('views', './views')
// app.set('view engine', 'hbs')

//Routes

// app.get('/', async (req, res) => {
//     const productos = await contenedor.getAll()
//     console.log(productos)
//     res.render('vista', {productos})
// })

// app.get('/productos', async (req, res) => {
//     const productos = await contenedor.getAll()
//     console.log(productos)
//     res.render('productos', {productos})
// })

// app.post('/productos', async (req, res) => {
//     try {
//         const objetos = await contenedor.getAll()

//         let newId
//         if (objetos.length == 0) {
//             newId = 1
//         } else {
//             newId = objetos[objetos.length - 1].id + 1
//         }

//         await contenedor.save({id: newId, ...req.body})

//         const productos = await contenedor.getAll(newId)
//         const indexObj = productos.findIndex((o) => o.id == newId)
        
//         console.log(productos[indexObj])

//         //return res.status(201).json({code: 201, msg: "Nuevo producto agregado correctamente", producto: productos[indexObj]})
//         res.redirect('/')
//     } catch (error) {
//         console.log(error)
//     }
// })

const DB_MENSAJES = [
    {author: 'Juan', text: 'Hola que tal'},
    {author: 'Pedro', text: 'Muy bien y vos'},
    {author: 'Ana', text: 'Genial'},
]

const PORT = 8081
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', err => console.log(`Error en el servidor ${err}`))


io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`)

    socket.emit('from-server-mensajes', {DB_MENSAJES})

    socket.on('from-client-mensaje', mensaje => {
        DB_MENSAJES.push(mensaje)
        io.sockets.emit('from-server-mensajes', {DB_MENSAJES})
    })
})