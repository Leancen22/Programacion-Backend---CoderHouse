
import ProductosDaoMongo from "./src/daos/Productos/ProductosDaoMongo.js";

let productosApi = ProductosDaoMongo.getInstance()
console.log(await productosApi.listarAll())