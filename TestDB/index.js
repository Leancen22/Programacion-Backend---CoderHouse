import { ContenedorSQL } from "./src/container/ContenedorSQL.js";

const apiAutos = new ContenedorSQL('autos')

async function main() {

    const cars = [
        {marca: 'TOYOTA', modelo: 'RAV4'},
        {marca: 'TOYOTA', modelo: 'RAV4'},
        {marca: 'TOYOTA', modelo: 'RAV4'}
    ]

    await apiAutos.insertar(cars)
    console.log('Insertado en tabla')

    console.log(await apiAutos.listarAll())

    console.log(await apiAutos.listar(2))

    await apiAutos.actualizar(1, {marca: 'HONDA', modelo: 'CR-V'})
    await apiAutos.actualizar(3, {modelo: 'Pruebaaa'})

    await apiAutos.eliminar(4)


    await apiAutos.cerrarConexion()
}
main()