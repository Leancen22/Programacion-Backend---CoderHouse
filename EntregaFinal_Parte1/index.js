const express = require("express")
const {Router} = express;

const app = express();
const productosRouter = require('./src/routes/productos.routes')
const carritoRouter = require('./src/routes/carrito.routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

const PORT = 8080 || process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Desde el puerto ${PORT}`);
});
server.on('error', err => console.log(`Error en el servidor ${err}`));