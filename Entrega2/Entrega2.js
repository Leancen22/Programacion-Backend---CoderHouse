const fs = require('fs')

class Contenedor {

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

            let newId
            if (objetos.length == 0) {
                newId = 1
            } else {
                newId = objetos[objetos.length - 1].id + 1
            }

            const newObj = {id: newId, ...obj}
            objetos.push(newObj)

            await fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2))
            return `Nuevo id generado: ${newId}`

        } catch (error) {
            throw new Error(`Ha ocurrido un error al guardar`)       
        }
    }

    /* 
        getById (number) : Object
        
        Recibe un id y retorna el objeto con el que se relaciona ese id
    */
    async getById (id) {
        try {
            const objeto = await this.getAll()
            return objeto.find( obj => obj.id === id )
        } catch (error) {
            throw new Error(`Ha ocurrido un error al lista el elemento ${id}: ${error}`)       
        }
    }

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
    async deleteById (id) {
        try {
            const objeto = await this.getAll()
            const obj = objeto.filter( i => i.id !== id)
            fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, 2))
        } catch (error) {
            throw new Error(`Ha ocurrido un error al eliminar el elemento ${id}: ${error}`)
        }
    }

    /* 
        deleteAll () : void
        
        Elimina todos los objetos presentes en el archivo
    */
    async deleteAll () {
        try {
            await fs.promises.writeFile(this.archivo, '')
            return 'Contenido borrado exitosamente'
        } catch (error) {
            throw new Error(`Ha ocurrido un error al eliminar: ${error}`)
        }
    }
    

}

//Metodo lanzador
async function main(){
    const c = new Contenedor("./productos.txt")
    console.log(await c.getAll())
    console.log(await c.save({"title" : "titulo del producto", "price" : 1.99, "thumbnail" : "Url foto producto"}))
    console.log(await c.save({"title" : "titulo del producto 2", "price" : 2.99, "thumbnail" : "Url foto producto 2 "}))
    console.log(await c.save({"title" : "titulo del producto 3", "price" : 3.99, "thumbnail" : "Url foto producto 3"}))
    console.log(await c.save({"title" : "titulo del producto 4", "price" : 4.99, "thumbnail" : "Url foto producto 4"}))
    console.log(await c.save({"title" : "titulo del producto 5", "price" : 5.99, "thumbnail" : "Url foto producto 5"}))
    console.log(await c.getAll())
    console.log(await c.getById(2))
    console.log(await c.getById(5))
    console.log(await c.deleteById(2))
    console.log(await c.deleteById(3))
    console.log(await c.getAll())
    console.log(await c.deleteAll())
    console.log(await c.getAll())
}
main()