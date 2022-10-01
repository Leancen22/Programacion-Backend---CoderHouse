import config from "../config.js";

let ProductoDao
let CarritoDao

switch (config.modo) {
    case 'memoria':
        const {default: ProductosDaoMemoria} = await import("./daos/Productos/ProductosDaoMemoria.js");
        const {default: CarritosDaoMemoria} = await import("./daos/Carritos/CarritosDaoMemoria.js");
        ProductoDao = new ProductosDaoMemoria()
        CarritoDao = new CarritosDaoMemoria()
        break
    case 'json':
        const {default: ProductosDaoArchivo} = await import("./daos/Productos/ProductosDaoArchivo.js");
        const {default: CarritosDaoArchivo} = await import("./daos/Carritos/CarritosDaoArchivo.js");
        ProductoDao = new ProductosDaoArchivo()
        CarritoDao = new CarritosDaoArchivo()
        break
    case 'mongo':
        const {default: ProductosDaoMongo} = await import("./daos/Productos/ProductosDaoMongo.js");
        const {default: CarritosDaoMongo} = await import("./daos/Carritos/CarritosDaoMongo.js");
        ProductoDao = new ProductosDaoMongo()
        CarritoDao = new CarritosDaoMongo()
        break
    case 'firebase':
        const {default: ProductosDaoFirebase} = await import("./daos/Productos/ProductosDaoFirebase.js");
        const {default: CarritosDaoFirebase} = await import("./daos/Carritos/CarritosDaoFirebase.js");
        ProductoDao = new ProductosDaoFirebase()
        CarritoDao = new CarritosDaoFirebase()
        break
}

export {ProductoDao, CarritoDao}