import ContenedorFirebase from "../../Containers/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carrito')
    }

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

// async function main() {
//     const f = new ProductosDaoFirebase('productos')
//     console.log(await f.getAll())
//     console.log(await f.updateById('DodBYVg8A8w2sHlCUgO0', {'nombre': 'nuevo nombre'}))
//     await f.deleteById('uEzRh3noaRSur3iOHRqF')
//     await f.deleteById('nE7o2j7Q95EX21PB3dXR')
//     await f.deleteById('m6NkabNspOFH6UAI9d3B')

// }
// main()

export default CarritosDaoFirebase
