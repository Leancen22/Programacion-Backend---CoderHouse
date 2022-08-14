const express = require('express')
const morgan = require('morgan')
const { Router } = express

const app = express()
const routerProductos = require('./src/routes/productos.routes')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/api/productos', routerProductos)


// app.get('/api/productos/:id', (req, res) => {
//     try {
//         const id = req.params.id
        
//         const indexObj = test.findIndex((o) => o.id == id)

//         if (indexObj == -1) {
//             res.status(400).json({code: 404, msg: `No existe objeto con id ${id}`})
//         }
//         res.status(200).json(test[indexObj])

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
//     }
// })

// app.post('/api/productos', (req, res) => {
//     const {mensaje, id} = req.body
//     test.push(req.body)

//     res.status(201).json({code: 201, msg: `Ejemplo ${mensaje} guardado correctamente`})
// })

// app.put('/api/productos/:id', (req, res) => {

// })

// app.delete('/api/productos/:id', () => {})

// app.get('*', (req, res) => {
//     res.status(404).json({
//         code: 404,
//         mdg: 'not found'
//     })
// })


const PORT = 8081
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', err => console.log(`Error en el servidor ${err}`))