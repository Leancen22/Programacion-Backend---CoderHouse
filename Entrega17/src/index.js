//Ya no es necesario

import config from "../config.js";

let ProductoDao
let CarritoDao
let MensajesDao
let UsuarioDao

switch (config.modo) {
    case 'mongo':
        const {default: ProductosDaoMongo} = await import("./daos/Productos/ProductosDaoMongo.js");
        const {default: CarritosDaoMongo} = await import("./daos/Carritos/CarritosDaoMongo.js");

        const {default: UsuariosDaosMongo} = await import("./daos/Usuarios/UsuariosDaosMongo.js");

        UsuarioDao = new UsuariosDaosMongo()
        ProductoDao = new ProductosDaoMongo()
        CarritoDao = new CarritosDaoMongo()
        break
}

export {ProductoDao, CarritoDao, MensajesDao, UsuarioDao}