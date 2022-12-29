import ProductosDaoMongo from '../src/daos/Productos/ProductosDaoMongo.js'
import {strict as assert} from 'assert'
import { existsSync, readFileSync, unlinkSync } from 'fs'

describe("Test de integracion de Productos", () => {
    it('Deberia crear el contenedor con los productos vacio', async () => {
        let productosApi = ProductosDaoMongo.getInstance()
        assert.deepStrictEqual(await productosApi.listarAll(), [])
    })
})

