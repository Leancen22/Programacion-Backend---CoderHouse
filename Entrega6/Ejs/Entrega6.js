const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

const Contenedor = require('./Contenedor.js')

const contenedor = new Contenedor("./productos.txt")

//Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('/public'))

//Motor de plantillas

app.set('views', './views')
app.set('view engine', 'ejs')

//Routes

app.get('/', async (req, res) => {
    const productos = await contenedor.getAll()
    console.log(productos)
    res.render('pages/index', {productos})
})

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll()
    console.log(productos)
    res.render('pages/productos', {productos})
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

const PORT = 8081
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', err => console.log(`Error en el servidor ${err}`))