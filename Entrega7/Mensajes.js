const fs = require('fs')

class Mensajes {

    //Constructor de la clase contenedor
    constructor (archivo) {
        this.archivo = archivo
    }

    /* 
        save (Object) : Number
        
        Recibe un objeto y retorna el id con el que se inserta al archivo
    */
    async save (obj) {
        try {
            const objetos = await this.getAll()

            const fecha = new Date().toLocaleString()

            const newObj = {fecha_actual: fecha, ...obj}
            objetos.push(newObj)

            await fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2))
            return newObj

        } catch (error) {
            throw new Error(`Ha ocurrido un error al guardar`)       
        }
    }

    /* 
        getById (number) : Object
        
        Recibe un id y retorna el objeto con el que se relaciona ese id
    */
    // async getById (id) {
    //     try {
    //         const objeto = await this.getAll()
    //         return objeto.find( obj => obj.id === id )
    //     } catch (error) {
    //         throw new Error(`Ha ocurrido un error al lista el elemento ${id}: ${error}`)       
    //     }
    // }

    /* 
        getById () : Object []
        
        Retorna el array de objetos del archivo
    */
    async getAll () {
        try {
            const objs = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    /* 
        deleteById (number) : void
        
        Recibe un id y elimina el objeto con ese id
    */
    // async deleteById (id) {
    //     try {
    //         const objeto = await this.getAll()
    //         const obj = objeto.filter( i => i.id !== id)
    //         fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, 2))
    //     } catch (error) {
    //         throw new Error(`Ha ocurrido un error al eliminar el elemento ${id}: ${error}`)
    //     }
    // }

    /* 
        deleteAll () : void
        
        Elimina todos los objetos presentes en el archivo
    */
    // async deleteAll () {
    //     try {
    //         await fs.promises.writeFile(this.archivo, '')
    //         return 'Contenido borrado exitosamente'
    //     } catch (error) {
    //         throw new Error(`Ha ocurrido un error al eliminar: ${error}`)
    //     }
    // }
    
    /**
     * updateById (number, Object) : void
     * 
     * Actualiza el objeto con id number con los datos de Object
     */
    // async updateById (id, obj) {
    //     try {
    //         const objetos = await this.getAll()
    //         const indexObj = objetos.findIndex((o) => o.id == id)
    //         const producto = await this.getById(id)
            
    //         //objetos[indexObj] = {id, ...obj}
    //         objetos[indexObj].id = id
    //         if (obj.title) objetos[indexObj].title = obj.title
    //         if (obj.price) objetos[indexObj].price = obj.price
    //         if (obj.thumbnail) objetos[indexObj].thumbnail = obj.thumbnail

    //         await fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2))

    //         return `Actualizado correctamente`
    //     } catch (error) {
    //         throw new Error(`Ha ocurrido un error al actualizar: ${error}`)
    //     }
    // }

}

// async function main () {
//     const m = new Mensajes('./mensajes.txt')
//     console.log(await m.getAll())
//     await m.save({user: 'otro@corre.com', mensaje: "test"})
//     await m.save({user: 'otro@corre.comfdfdf', mensaje: "tes32t"})
//     await m.save({user: 'otro@corre.comdsd', mensaje: "test232"})
//     console.log(await m.getAll())
//     console.log(await m.save({user: 'otro@corre.comdsd', mensaje: "test232"}))
//     console.log(await m.getAll())
// }
// main()

module.exports = Mensajes