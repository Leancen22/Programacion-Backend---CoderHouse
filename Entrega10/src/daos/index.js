import config from '../config.js'

let DaoProducto
let DaoCarrito

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./Productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./Carritos/CarritosDaoArchivo.js')

        DaoProducto = new ProductosDaoArchivo()
        DaoCarrito = new CarritosDaoArchivo()

        break
    case 'memoria':
        const { default: ProductosDaoMemoria } = await import('./Productos/ProductosDaoMemoria.js')
        const { default: CarritosDaoMemoria } = await import('./Carritos/CarritosDaoMemoria.js')

        DaoProducto = new ProductosDaoMemoria()
        DaoCarrito = new CarritosDaoMemoria()

        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./Productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./Carritos/CarritosDaoFirebase.js')

        DaoProducto = new ProductosDaoFirebase()
        DaoCarrito = new CarritosDaoFirebase()

        break
    case 'mongo':
        const { default: ProductosDaoMongo } = await import('./Productos/ProductosDaoMongo.js')
        const { default: CarritosDaoMongo } = await import('./Carritos/CarritosDaoMongo.js')

        DaoProducto = new ProductosDaoMongo()
        DaoProducto = new CarritosDaoMongo()

        break
}

export { DaoProducto, DaoCarrito }