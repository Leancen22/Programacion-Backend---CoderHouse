const Mensajes = require("./src/container/Mensajes.js");

const mensajes = new Mensajes('mensajes')

async function main() {

    const mensaje = [
        {user: 'leandro@corre.ocm', mensaje: 'mensaje de pruebas'}
    ]

    await mensajes.save(mensaje)
    console.log('Insertado en tabla')

    console.log(await mensajes.getAll())

    //console.log(await apiAutos.listar(2))

    //await apiAutos.actualizar(1, {marca: 'HONDA'})
    // await apiAutos.actualizar(3, {modelo: 'Pruebaaa'})

    //await apiAutos.eliminar(4)


    await mensajes.cerrarConexion()
}
main()