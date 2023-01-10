import ProductosDaoMongo from '../src/daos/Productos/ProductosDaoMongo.js'
// import {strict as assert} from 'assert'
// import { existsSync, readFileSync, unlinkSync } from 'fs'

// describe("Test de integracion de Productos", () => {
//     it('Deberia crear el contenedor con los productos vacio', async () => {
//         let productosApi = ProductosDaoMongo.getInstance()
//         assert.deepStrictEqual(await productosApi.listarAll(), [])
//     })

//     it('Deberia agregar un producto a la coleccion', async () => {
//         let productosApi = ProductosDaoMongo.getInstance()
//         await productosApi.guardar({title: "titulo test", price: 2, categoria: "categoria test", thumbnail: "Foto test"})
//         assert.deepStrictEqual(await productosApi.listarAll(), {title: "titulo test", price: 2, categoria: "categoria test", thumbnail: "Foto test"})
//     })
// })

let productosApi = ProductosDaoMongo.getInstance()
let valores = await productosApi.listarAll()
console.log(valores)