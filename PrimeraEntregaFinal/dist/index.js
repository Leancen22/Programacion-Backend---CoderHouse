"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routerProductos = require('./routes/productos.routes');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/productos', routerProductos);
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Desde el puerto ${PORT}`);
});
