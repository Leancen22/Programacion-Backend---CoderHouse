import express from "express";
import { Router } from "express";

const app = express();

const routerProductos = require('./routes/productos.routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routerProductos);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Desde el puerto ${PORT}`);
});